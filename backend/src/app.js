import express from "express";
import cors from "cors";
import helmet from "helmet";

import enquiryRoutes from "./routes/enquiryRoutes.js";
import whatsappWebhookRoutes from "./routes/whatsappWebhookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
  process.env.CLIENT_WWW_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.use(
  express.json({
    verify: (req, res, buffer) => {
      if (req.originalUrl.startsWith("/api/webhooks/whatsapp")) {
        req.rawBody = Buffer.from(buffer);
      }
    },
  }),
);

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/webhooks/whatsapp", whatsappWebhookRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Rhino Tours API is running",
  });
});

export default app;
