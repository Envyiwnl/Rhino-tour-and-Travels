import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const {
      uid,
      email = "",
      name = "",
      picture = "",
      firebase = {},
    } = req.user;

    const provider =
      firebase?.sign_in_provider && firebase.sign_in_provider !== "custom"
        ? firebase.sign_in_provider
        : "";

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        $set: {
          name: name || "",
          email: email || "",
          photoURL: picture || "",
          provider,
          lastLoginAt: new Date(),
        },
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("User sync failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to sync user.",
    });
  }
};
