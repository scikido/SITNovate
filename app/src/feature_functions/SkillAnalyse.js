import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyseSkills = async(jd, skills) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const history = [{
        role: "user",
        parts: [{ text: "Job Description: " + jd + "\nSkills: " + skills }]
    }];

    // Validate the structure of history before passing it to ChatSession
    if (!Array.isArray(history) || history.length === 0) {
        throw new Error("History must be a non-empty array.");
    }

    history.forEach(item => {
        if (typeof item !== 'object' || item === null || !Array.isArray(item.parts)) {
            throw new Error("Each item in history must be an object with a 'parts' array.");
        }
        item.parts.forEach(part => {
            if (typeof part !== 'object' || part === null) {
                throw new Error("Each part must be an object.");
            }
        });
    });

    const chat = model.startChat({ history });

    const result = await chat.sendMessage("Check if the skills required in job description are present in my skills section.");
    console.log("Analyse Skills Result:", result.response.text());
    return result.response.text();
};

const analyseExperience = async(jd, experience) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(`Job Description: ${jd}\nExperience: ${experience}`);
    console.log("Analyse Experience Result:", result.response.text());
    return result.response.text();
};

const analyseProjects = async(jd, project) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(`Job Description: ${jd}\nProjects: ${project}`);
    console.log("Analyse Projects Result:", result.response.text());
    return result.response.text();
};

const analyseOthers = async(jd, achievements, others) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(`Job Description: ${jd}\nAchievements & Others: ${achievements} & ${others}`);
    console.log("Analyse Others Result:", result.response.text());
    return result.response.text();
};

export { analyseSkills, analyseExperience, analyseProjects, analyseOthers };