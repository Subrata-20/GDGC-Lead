import express from "express"

import { isAuthenticated } from "../middlewares/auth.js"
import { generateQuestionsAndStore } from "../controllers/question.controller.js"

const router = express.Router()



router.post("/generate-qn",isAuthenticated ,generateQuestionsAndStore)



export default router;
