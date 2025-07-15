import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connection } from "./db/db.js";
import userRouter from "./routes/user.route.js";
import questionRouter from "./routes/question.route.js";
const app = express();

dotenv.config();

app.use(cors({
    origin: 'https://gdgc-lead-3.onrender.com',  // Allow only your frontend
    credentials: true,  // Allow credentials (cookies, authentication headers)
}));

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/question", questionRouter);

connection();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
