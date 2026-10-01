import crypto from "crypto";

export default function verifyWhatsAppSignature(req, res, next) {
  const signature = req.get("x-hub-signature-256");
  const appSecret = process.env.META_APP_SECRET;

  if (!appSecret) {
    console.error("META_APP_SECRET is not configured.");
    return res.sendStatus(500);
  }

  if (!signature || !signature.startsWith("sha256=") || !req.rawBody) {
    return res.sendStatus(401);
  }

  const receivedSignature = signature.slice(7);

  const expectedSignature = crypto
    .createHmac("sha256", appSecret)
    .update(req.rawBody)
    .digest("hex");

  const receivedBuffer = Buffer.from(receivedSignature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return res.sendStatus(401);
  }

  next();
}
