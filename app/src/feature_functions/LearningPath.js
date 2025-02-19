import dotenv from "dotenv";
import axios from "axios";
import pkg from "yt-search";
const { VideosSearch } = pkg;

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getContent(topic) {
    const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    const payload = {
        contents: [{
            role: "user",
            parts: [{ text: topic }]
        }],
        system_instruction: "You are a course content creator that creates the list of topics a person needs to study to understand the given subject. You will give a JSON list as an output containing only the headings of the topics that are required to learn the subject.",
        generation_config: {
            temperature: 1,
            top_p: 0.95,
            top_k: 64,
            max_output_tokens: 8192,
            response_mime_type: "text/plain"
        }
    };

    try {
        const response = await axios.post(`${apiUrl}?key=${GEMINI_API_KEY}`, payload);
        const textContent = response.data.candidates[0].content.parts[0].text;
        const start = textContent.indexOf("[");
        const end = textContent.lastIndexOf("]") + 1;
        const jsonString = textContent.substring(start, end);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching content:", error);
        return [];
    }
}

async function getYTLinks(topics) {
    let links = [];
    for (const topic of topics) {
        try {
            const videosSearch = await VideosSearch(topic, { limit: 4 });
            let linkList = videosSearch.videos.map(video => video.url);
            links.push(linkList);
        } catch (error) {
            console.error(`Error fetching videos for topic: ${topic}`, error);
            links.push([]);
        }
    }
    return links;
}

// New function to generate content
export async function generateContent(topic) {
    const topics = await getContent(topic);
    const links = await getYTLinks(topics);

    const content = topics.map((topic, index) => ({
        index: index + 1,
        topic: topic,
        link: links[index]
    }));

    console.log(content);
}

// // Update the invocation of the new function
// (async () => {
//     await generateContent("Theory of Computation");
// })();