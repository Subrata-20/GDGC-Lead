import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  fetchTestResult,
  generateQuestionsAndStore,
  getHistoryOfUser,
  storeResult,
  
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/generate-qn", isAuthenticated, generateQuestionsAndStore);
router.get("/getHistory", isAuthenticated, getHistoryOfUser);
router.post("/store-result", isAuthenticated, storeResult);
router.post("/get-result", isAuthenticated, fetchTestResult);

export default router;
