import { nanoid } from "nanoid";
import { create, getAnalytics } from "../repository/url-repository.js";
import { redirect } from "../repository/url-repository.js";

export const createURL = async (data) => {
    try {
        const shortID = nanoid(8);
        const payload = {
            shortId: shortID,
            redirectURL: data.url,
            visitHistory: [],
        };
        const result = await create(payload);
        return result;
    } catch (error) {
        console.log("Something went wrong in URL service:", error.message);
        throw error;
    }
};

export const redirectURL = async (shortId) => {
    try {
        const urlData = await redirect(shortId);
        if(!urlData) {
            throw new Error("Short URL not found");
        }
        return urlData.redirectURL;
    } catch (error) {
        console.error("Error in redirect service:", error.message);
        throw error;
    }
};

export const getAnalyticsURL = async (shortId) => {
    try {
        const data = await getAnalytics(shortId);
        if(!data) {
            throw new Error("Short URL not found");
        }
        return {
            totalClicks: data.visitHistory.length,
            visitHistory: data.visitHistory,
        };
    } catch (error) {
        console.error("Error in redirect service:", error.message);
        throw error;
    }
}

