import Enquiry from "../models/Enquiry.js";
import {
  sendClientEnquiryNotification,
  sendCustomerAcknowledgement,
} from "../services/whatsappService.js";

export const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      tripType,
      destination,
      startDate,
      endDate,
      travellers,
      message,
      whatsappConsent,
    } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !tripType ||
      !destination ||
      !startDate ||
      !endDate ||
      !travellers
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid travel dates.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be in the past.",
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date.",
      });
    }

    let normalizedPhone = phone.replace(/\D/g, "");

    if (normalizedPhone.length === 10) {
      normalizedPhone = `91${normalizedPhone}`;
    }

    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: normalizedPhone,
      tripType,
      destination,
      startDate: start,
      endDate: end,
      travellers: Number(travellers),
      message: message?.trim() || "",
      whatsappConsent: whatsappConsent === true,
    });

    if (process.env.WHATSAPP_ENABLED === "true") {
      if (enquiry.whatsappConsent) {
        try {
          const customerResult = await sendCustomerAcknowledgement(enquiry);

          await Enquiry.updateOne(
            { _id: enquiry._id },
            {
              $set: {
                "whatsappNotification.customer.status": "sent",
                "whatsappNotification.customer.messageId":
                  customerResult.messageId,
                "whatsappNotification.customer.sentAt": new Date(),
                "whatsappNotification.customer.error": null,
              },
            },
          );
        } catch (error) {
          console.error("Customer WhatsApp error:", error.message);

          await Enquiry.updateOne(
            { _id: enquiry._id },
            {
              $set: {
                "whatsappNotification.customer.status": "failed",
                "whatsappNotification.customer.error": error.message,
              },
            },
          );
        }
      } else {
        await Enquiry.updateOne(
          { _id: enquiry._id },
          {
            $set: {
              "whatsappNotification.customer.status": "skipped",
            },
          },
        );
      }

      try {
        const clientResult = await sendClientEnquiryNotification(enquiry);

        await Enquiry.updateOne(
          { _id: enquiry._id },
          {
            $set: {
              "whatsappNotification.client.status": "sent",
              "whatsappNotification.client.messageId": clientResult.messageId,
              "whatsappNotification.client.sentAt": new Date(),
              "whatsappNotification.client.error": null,
            },
          },
        );
      } catch (error) {
        console.error("Client WhatsApp error:", error.message);

        await Enquiry.updateOne(
          { _id: enquiry._id },
          {
            $set: {
              "whatsappNotification.client.status": "failed",
              "whatsappNotification.client.error": error.message,
            },
          },
        );
      }
    }
    const updatedEnquiry = await Enquiry.findById(enquiry._id);

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    console.error("Create enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry.",
    });
  }
};
