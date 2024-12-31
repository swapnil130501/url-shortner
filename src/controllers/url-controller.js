import { createURL } from "../services/url-service.js";
import { redirectURL } from "../services/url-service.js";
import { getAnalyticsURL } from "../services/url-service.js";

export const handleCreateURL = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "url is required",
            });
        }

        const result = await createURL({ url });

        return res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in handleCreateURL:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const handleRedirect = async (req, res) => {
    try {
        const { shortId } = req.params;
        const response = await redirectURL(shortId);
        return res.redirect(response);
    } catch (error) {
        console.error("Error in handleRedirect:", error.message);
        return res.status(404).json({
            success: false,
            message: "Short URL not found",
        });
    }
};

export const handleAnalytics = async (req, res) => {
    try {
        const { shortId } = req.params;
        const analyticsData = await getAnalyticsURL(shortId);
        return res.status(200).json({
            success: true,
            data: analyticsData,
        });
    } catch (error) {
        console.error("Error in handleAnalytics:", error.message);
        return res.status(404).json({
            success: false,
            message: "Short URL not found",
        });
    }
};

