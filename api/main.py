from fastapi import FastAPI, File, UploadFile, HTTPException
import pdfplumber
from docx import Document
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
import re

from pydantic import BaseModel

# Load environment variables
load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Load spaCy model

app = FastAPI()

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    return " ".join([para.text for para in doc.paragraphs])

def extract_text(file_path):
    if file_path.endswith('.pdf'):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        return extract_text_from_docx(file_path)
    elif file_path.endswith('.txt'):
        with open(file_path, 'r') as f:
            return f.read()
    else:
        raise ValueError("Unsupported file format")


def extract_sections(text):
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction="Extract resume information and convert it to JSON."
    )
    chat_session = model.start_chat()
    response = chat_session.send_message(text)
    if response._done:
        # Clean the response to remove the markdown formatting
        json_string = response._result.candidates[0].content.parts[0].text
        json_string = json_string.replace("```json\n", "").replace("\n```", "")
        try:
            return json.loads(json_string)  # Parse the cleaned string into JSON
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Failed to parse JSON")
    else:
        raise HTTPException(status_code=500, detail="Failed to process resume")

@app.post("/upload/")
async def upload_resume(file: UploadFile = File(...)):
    file_extension = file.filename.split(".")[-1]
    if file_extension not in ["pdf", "docx", "txt"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    temp_file_path = f"temp.{file_extension}"
    with open(temp_file_path, "wb") as temp_file:
        temp_file.write(await file.read())
    text = extract_text(temp_file_path)
    os.remove(temp_file_path)
    resume_data = {
        "parsed_info": extract_sections(text)
    }
    return resume_data

class InterviewRequest(BaseModel):
    skills: str
    experience: str
    job_description: str

# Define generation config
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction="Give me only all questions in comma-separated list format enclosed in square brackets.",
)

@app.post("/generate_questions")
async def generate_questions(request: InterviewRequest):
    chat_session = model.start_chat(history=[])
    
    prompt = f"""
    You are an interviewer hiring for Job Role of Software Engineer III - AI/ML Engineer and job description is given below. Your task is to interview me. My skills and experience are accordingly mentioned. Give me only all questions in comma-separated list format enclosed in square brackets.

    Skills: {request.skills}
    Experience: {request.experience}
    
    Job Description: {request.job_description}
    """
    
    response = chat_session.send_message(prompt)
    result = response._result.candidates[0].content.parts[0].text

    # matches = re.findall(r'\?(?:\s|$)', result)  # Find all occurrences of '?'
    questions = re.split(r'\?\s*', result.strip("[]"))  # Split at '?'

    # Removing any empty strings and appending '?' back to each question
    questions = [q.strip() + "?" for q in questions if q.strip()]

    
    return {"questions": questions}


# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import google.generativeai as genai

# Configure Gemini model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction=(
        "Evaluate the given text and analyze if the interview candidate gave an appropriate answer to the question. "
        "Rate on a scale of 1 to 10 and also suggest improvements."
    ),
)

class EvaluationRequest(BaseModel):
    question: str
    answer: str

@app.post("/evaluate")
async def evaluate_answer(request: EvaluationRequest):
    try:
        chat_session = model.start_chat(history=[])
        prompt = (
            f"Evaluate the given text and analyze if the interview candidate gave an appropriate answer to the question. "
            f"Rate on a scale of 1 to 10 and also suggest improvements.\n\n"
            f"Question: {request.question}\n"
            f"Answer: {request.answer}\n"
        )
        response = chat_session.send_message(prompt)
        return {"evaluation": response._result.candidates[0].content.parts[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "AI Interview Answer Evaluator API is running!"}