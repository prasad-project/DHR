import express from "express";
import {
    getPatientById,
    getPatientByHealthId,
    getPatientHistory,
    updatePatient,
    getPatientStats,
    getHealthCard
} from "../controllers/patientController.js";

const router = express.Router();

/**
 * Patient Routes
 * Base path: /api/patient
 */

// Get patient by ID
router.get("/:patientId", getPatientById);

// get patient by Health ID /api/patient/health-id/:healthId
router.get("/healthId/:healthId", getPatientByHealthId);

// Get patient medical history //(`${API_BASE_URL}/patient/${patientId}/history`);
router.get("/:patientId/history", getPatientHistory);

// Get patient statistics
router.get("/:patientId/stats", getPatientStats);

// Update patient information
router.put("/:patientId", updatePatient);

// get health Card by Health ID /api/patient/healthCard
router.post("/healthCard",getHealthCard);

export default router;
