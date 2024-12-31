import express from 'express';
import { handleAnalytics, handleCreateURL, handleRedirect } from '../../controllers/url-controller.js';

const router = express.Router();

router.post("/url", handleCreateURL);
router.get("/:shortId", handleRedirect);
router.get("/analytics/:shortId", handleAnalytics);

export default router;