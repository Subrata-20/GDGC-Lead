import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionSet",
        required: true,
      },
    
    correctans: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const TestResult = mongoose.model("TestResult", testResultSchema);
