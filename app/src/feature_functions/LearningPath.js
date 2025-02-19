import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import YouTubeSearch from "youtube-search-api";
// const youtubesearchapi = require("youtube-search-api");
// const { VideosSearch } = pkg;

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a course content creator that creates a list of topics a person needs to study to understand a given subject. You will give a Python list as output containing only the headings of the topics required to learn the subject. For example:\n\nUser: French\nAssistant:[\n    \"French Alphabet and Pronunciation\",\n    \"Basic Greetings and Introductions\",\n    \"Numbers and Dates\",\n    \"Common Phrases and Expressions\",\n    \"French Grammar Basics\",\n    \"Nouns, Articles, and Gender\",\n    \"Pronouns (Subject, Object, Possessive)\",\n    \"Verbs: Present Tense (Regular and Irregular)\",\n    \"Adjectives and Adverbs\",\n    \"Prepositions and Conjunctions\",\n    \"Questions and Negations\",\n    \"Past Tense: Passé Composé and Imparfait\",\n    \"Future Tense and Conditional Mood\",\n    \"Imperative Mood\",\n    \"Vocabulary Building (Food, Travel, Family, etc.)\",\n    \"Listening and Speaking Practice\",\n    \"Reading Comprehension\",\n    \"Writing Practice (Emails, Letters, Essays)\",\n    \"Cultural Aspects (Customs, Traditions, Holidays)\",\n    \"French in Context (Conversations, Dialogues, Situational French)\"\n]\nUser: Python\nAssistant:[\n    \"Introduction to Python\",\n    \"Setting Up the Python Environment\",\n    \"Python Syntax and Semantics\",\n    \"Variables and Data Types\",\n    \"Operators (Arithmetic, Logical, Comparison)\",\n    \"Control Structures (if, else, elif, loops)\",\n    \"Functions and Lambda Expressions\",\n    \"Lists, Tuples, and Dictionaries\",\n    \"String Manipulation\",\n    \"File Handling (Reading, Writing, Working with Files)\",\n    \"Error Handling and Exceptions\",\n    \"Modules and Packages\",\n    \"Object-Oriented Programming (OOP)\",\n    \"Classes and Objects\",\n    \"Inheritance, Polymorphism, Encapsulation\",\n    \"Working with Libraries (NumPy, Pandas, etc.)\",\n    \"Introduction to Web Development with Python (Flask, Django)\",\n    \"Introduction to Databases (SQLite, PostgreSQL)\",\n    \"APIs and RESTful Services\",\n    \"Testing and Debugging\",\n    \"Python for Data Science and Machine Learning\",\n    \"Best Practices and Code Optimization\",\n    \"Version Control with Git\"\n]\n",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function getContent(role) {
    const chatSession = model.startChat({
        generationConfig,
        history: [{
                role: "user",
                parts: [
                    { text: "Quantum Comupting" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```python\n[\n    \"Introduction to Quantum Computing\",\n    \"Classical vs. Quantum Computation\",\n    \"Quantum Bits (Qubits)\",\n    \"Superposition and Entanglement\",\n    \"Quantum Gates and Circuits\",\n    \"Measurement and Decoherence\",\n    \"Quantum Algorithms (e.g., Deutsch-Jozsa, Grover's, Shor's)\",\n    \"Quantum Fourier Transform\",\n    \"Quantum Teleportation\",\n    \"Quantum Key Distribution (QKD)\",\n    \"Quantum Error Correction\",\n    \"Quantum Annealing\",\n    \"Adiabatic Quantum Computation\",\n    \"Topological Quantum Computing\",\n    \"Quantum Simulation\",\n    \"Quantum Machine Learning\",\n    \"Quantum Computing Hardware (Superconducting, Trapped Ions, etc.)\",\n    \"Quantum Programming Languages (e.g., Qiskit, Cirq)\",\n    \"Linear Algebra for Quantum Computing\",\n    \"Probability and Statistics for Quantum Computing\",\n    \"Advanced Quantum Algorithms\",\n    \"Quantum Complexity Theory\",\n    \"Current Research and Future Directions in Quantum Computing\"\n]\n```\n" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("Theory of computation");
    // const textContent = result.data.candidates[0].content.parts[0].text;
    const textContent = result.response.text();
    const start = textContent.indexOf("[");
    const end = textContent.lastIndexOf("]") + 1;
    const jsonString = textContent.substring(start, end);
    console.log(jsonString);
    return JSON.parse(jsonString);


    // try {
    //     const response = await axios.post(`${apiUrl}?key=${process.env.GEMINI_API_KEY}`, payload);
    //     console.log("API Response:", response.data); // Log the entire response for debugging

    //     // Check if candidates exist in the response
    //     if (response.data && response.data.candidates && response.data.candidates.length > 0) {
    //         const textContent = response.data.candidates[0].content.parts[0].text;
    //         const start = textContent.indexOf("[");
    //         const end = textContent.lastIndexOf("]") + 1;
    //         const jsonString = textContent.substring(start, end);
    //         return JSON.parse(jsonString);
    //     } else {
    //         console.error("No candidates found in the response.");
    //         return []; // Return an empty array if no candidates are found
    //     }
    // } catch (error) {
    //     console.error("Error fetching content:", error);
    //     return []; // Return an empty array on error
    // }
}
const fetchYouTubeVideos = async(keyword) => {
    try {
        let links = []
            // Search for videos using the keyword and limit to 4 results
        const results = await YouTubeSearch.GetListByKeyword(keyword, false, 4);

        // Extract video links and titles
        const videos = results.items.map((item) => ({
            title: item.title,
            link: `https://www.youtube.com/watch?v=${item.id}`,
        }));
        // console.log(`Links for "${keyword}":`);
        videos.forEach(video => {
            // console.log(video.link);
            links.push(video.link);
        });
        // console.log(links)
        return links;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
    }
};

// async function getYTLinks(topics) {
//     if (!Array.isArray(topics) || topics.length === 0) {
//         console.error("Invalid topics array:", topics);
//         return []; // Return an empty array if topics is not valid
//     }

//     let links = [];
//     for (const topic of topics) {
//         try {
//             // videosSearch = youtubesearchapi.GetListByKeyword("vectors")
//             // console.log("This is vid", videosSearch)

//             // const videosSearch = await VideosSearch(topic, { limit: 4 });
//             // let linkList = videosSearch.videos.map(video => video.url);
//             linkList = fetchYouTubeVideos(`${topic}`);
//             links.push(linkList);

//         } catch (error) {
//             console.error(`Error fetching videos for topic: ${topic}`, error);
//             links.push([]);
//         }
//     }
//     console
//     return links;
// }

// New function to generate content
export async function generateContent(topic) {
    const topics = await getContent(topic);
    // const links = await getYTLinks(topics);

    const content = await Promise.all(topics.map(async(topic, index) => {
        const links = await fetchYouTubeVideos(topic); // Fetch links for each topic
        return {
            index: index + 1,
            topic: topic,
            links: links // Store the array of links for each topic
        };
    }));
    return content;
    // console.log(content);
}

// Update the invocation of the new function
// (async() => {
//     await generateContent("Theory of Computation");
// })();