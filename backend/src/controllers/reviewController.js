import Review from "../models/Review.js";
import User from "../models/User.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name photoURL")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Get reviews failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load reviews.",
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, location = "", comment } = req.body;

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    if (!comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review comment is required.",
      });
    }

    const firebaseUid = req.user.uid;

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      const { email = "", name = "", picture = "", firebase = {} } = req.user;

      user = await User.findOneAndUpdate(
        { firebaseUid },
        {
          $set: {
            name: name || "",
            email: email || "",
            photoURL: picture || "",
            provider: firebase?.sign_in_provider || "",
            lastLoginAt: new Date(),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    const review = await Review.create({
      user: user._id,
      rating: numericRating,
      location: location.trim(),
      comment: comment.trim(),
    });

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name photoURL",
    );

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Create review failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit review.",
    });
  }
};
