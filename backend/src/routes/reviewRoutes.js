import express from "express";
import rateLimit from "express-rate-limit";

import { createReview, getReviews } from "../controllers/reviewController.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  keyGenerator: (req) => req.user.uid,

  message: {
    success: false,
    message: "Too many reviews submitted. Please try again later.",
  },
});

router.get("/", getReviews);

router.post("/", verifyFirebaseToken, reviewLimiter, createReview);

export default router;
