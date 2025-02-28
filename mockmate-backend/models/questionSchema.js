import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      key: { type: String, required: true }, // Option key (a, b, c, d)
      value: { type: String, required: true }, // Option value (text)
    },
  ],
  answer: {
    key: { type: String, required: true }, // Correct answer key
    value: { type: String, required: true }, // Correct answer value
  },
});

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


// const newQuestionSet = new QuestionSet({
//   user: userId,
//   topic,
//   difficulty,
//   questions: questionArray,
// });
// await newQuestionSet.save();