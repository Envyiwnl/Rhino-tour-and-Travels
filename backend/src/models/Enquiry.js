import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    tripType: {
      type: String,
      required: true,
      enum: ["leisure", "adventure", "wildlife", "cultural"],
    },

    destination: {
      type: String,
      required: true,
      enum: ["assam", "meghalaya", "arunachal-pradesh"],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    travellers: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    whatsappConsent: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },

    whatsappNotification: {
      customer: {
        status: {
          type: String,
          enum: ["pending", "sent", "delivered", "read", "failed", "skipped"],
          default: "pending",
        },

        messageId: {
          type: String,
          default: null,
        },

        sentAt: {
          type: Date,
          default: null,
        },

        statusUpdatedAt: {
          type: Date,
          default: null,
        },

        error: {
          type: String,
          default: null,
        },
      },

      client: {
        status: {
          type: String,
          enum: ["pending", "sent", "delivered", "read", "failed"],
          default: "pending",
        },

        messageId: {
          type: String,
          default: null,
        },

        sentAt: {
          type: Date,
          default: null,
        },

        statusUpdatedAt: {
          type: Date,
          default: null,
        },

        error: {
          type: String,
          default: null,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
