import mongoose from "mongoose";



const questionSetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    questions: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);

