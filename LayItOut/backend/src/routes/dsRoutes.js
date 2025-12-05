import express from "express";
import { testAPI, saveState, loadState } from "../controllers/dsController.js";

const router = express.Router();

// Test API
router.get("/test", testAPI);

// Save state in-memory
router.post("/save", saveState);

// Load saved state
router.get("/load/:id", loadState);

export default router;
