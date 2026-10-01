import express from "express";
import Enquiry from "../models/Enquiry.js";
import verifyWhatsAppSignature from "../middleware/verifyWhatsAppSignature.js";

const router = express.Router();

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

router.post("/", verifyWhatsAppSignature, async (req, res) => {
  try {
    const entries = req.body.entry || [];

    for (const entry of entries) {
      const changes = entry.changes || [];

      for (const change of changes) {
        const statuses = change.value?.statuses || [];

        for (const statusData of statuses) {
          const { id: messageId, status, timestamp, errors } = statusData;

          if (!["sent", "delivered", "read", "failed"].includes(status)) {
            continue;
          }

          const enquiry = await Enquiry.findOne({
            $or: [
              {
                "whatsappNotification.customer.messageId": messageId,
              },
              {
                "whatsappNotification.client.messageId": messageId,
              },
            ],
          });

          if (!enquiry) {
            continue;
          }

          const notification =
            enquiry.whatsappNotification.customer.messageId === messageId
              ? enquiry.whatsappNotification.customer
              : enquiry.whatsappNotification.client;

          const eventTime = timestamp
            ? new Date(Number(timestamp) * 1000)
            : new Date();

          if (
            notification.statusUpdatedAt &&
            eventTime < notification.statusUpdatedAt
          ) {
            continue;
          }

          notification.status = status;
          notification.statusUpdatedAt = eventTime;

          if (status === "failed") {
            notification.error =
              errors?.[0]?.message ||
              errors?.[0]?.title ||
              "WhatsApp message failed.";
          } else {
            notification.error = null;
          }

          await enquiry.save();
        }
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("WhatsApp webhook error:", error);

    return res.sendStatus(500);
  }
});

export default router;
