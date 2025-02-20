// JavaScript equivalent of Python script for resume parsing

import fs from 'fs';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import natural from 'natural';
import nlp from 'compromise';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

function extractContactInfo(text) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    return {
        email: text.match(emailRegex) ? text.match(emailRegex)[0] : null,
        phone: text.match(phoneRegex) ? text.match(phoneRegex)[0] : null
    };
}

function extractName(text) {
    const doc = nlp(text);
    const people = doc.people().out('array');
    return people.length ? people[0] : null;
}

function extractSkills(text) {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text.toLowerCase());
    const skillKeywords = ["experience", "knowledge", "proficient", "skilled", "familiar", "expertise"];
    return words.filter(word => skillKeywords.includes(word));
}

async function extractSections(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Extract information from the given resume text and convert it to JSON: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

async function parseResume(filePath) {
    const text = await extractTextFromPDF(filePath);
    let extractedSectionsString = await extractSections(text);

    // Clean up the JSON string by removing Markdown-style code block markers
    extractedSectionsString = extractedSectionsString.replace(/```json\n|\n```/g, '');

    let extractedSections;
    try {
        extractedSections = JSON.parse(extractedSectionsString);
    } catch (error) {
        console.error("Error parsing extracted sections to JSON:", error);
        extractedSections = {};
    }

    return { extracted_sections: extractedSections };
}


(async() => {
    const filePath = "/Users/devyanichavan/Documents/Projects/SITNovate/app/Devyani Resume.pdf";
    const result = await parseResume(filePath);
    console.log(result);
})();