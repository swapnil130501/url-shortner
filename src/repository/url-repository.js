import URL from "../models/url.js";

export const create = async (data) => {
    try {
        const result = await URL.create(data);
        return result;
    } catch (error) {
        console.log("Something went wrong in URL repository:", error.message);
        throw error;
    } 
};

export const redirect = async (shortId) => {
    try {
        const result = await URL.findOneAndUpdate(
            { shortId }, 
            { $push: { visitHistory: { timeStamp: Date.now() } } },
            { new: true }
        );
    
        return result;
    } catch (error) {
        console.error("Error in redirect function:", error.message);
        throw error;
    }
}

export const getAnalytics = async (shortId) => {
    try {
        const result = await URL.findOne({ shortId });
        return result;
    } catch (error) {
        console.error("Error in redirect function:", error.message);
        throw error;
    }
}
