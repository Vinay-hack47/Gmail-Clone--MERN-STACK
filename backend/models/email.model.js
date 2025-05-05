import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryDate: {
      type: Date,
      require:true
    },
    delivered:{
      type:Boolean,
      default:false
    },
  },
  { timestamps: true }
);

export const Email = mongoose.model("Email", emailSchema);
