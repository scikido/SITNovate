import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyCDz4gjhidaJvdzPjYHxdo1o0CAqiqll9k");

export async function getRoadmap(role) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "I will give you my dream Job Role and you must create a proper roadmap that i must follow to achieve it. the output should be in HTML format",
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
        return result.response.text();
    } catch (error) {
        console.error("Error:", error);
        return "An error occurred while generating the roadmap.";
    }
}

// Example usage
// getRoadmap("Machine Learning Engineer");