import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getRoadmap(role) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "I will give you my dream Job Role and you must create a proper roadmap that i must follow to achieve it.",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
    };


    try {
        const chatSession = model.startChat({
            history: [],
            generationConfig,
        });

        const result = await chatSession.sendMessage(role);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage
// getRoadmap("Machine Learning Engineer");