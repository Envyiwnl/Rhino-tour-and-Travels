import express from "express";

import { createReview, getReviews } from "../controllers/reviewController.js";

import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", verifyFirebaseToken, createReview);

export default router;
