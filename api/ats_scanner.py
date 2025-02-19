import re
import pdfplumber
from docx import Document
import spacy
import os


import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load spaCy model
nlp = spacy.load("en_core_web_sm")
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
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

def extract_contact_info(text):
    email = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    phone = re.findall(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    return {
        "email": email[0] if email else None,
        "phone": phone[0] if phone else None
    }

def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def extract_skills(text):
    """
    Extract skills from resume text using NLP.
    """
    doc = nlp(text)
    skills = set()

    # Rule 1: Extract nouns and noun phrases
    for chunk in doc.noun_chunks:
        if chunk.root.pos_ == "NOUN":
            skills.add(chunk.text.lower())

    # Rule 2: Extract entities labeled as "ORG" (organizations) or "PRODUCT" (products)
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT"]:
            skills.add(ent.text.lower())

    # Rule 3: Extract words commonly associated with skills
    skill_keywords = ["experience", "knowledge", "proficient", "skilled", "familiar", "expertise"]
    for token in doc:
        if token.text.lower() in skill_keywords:
            for child in token.children:
                if child.pos_ == "NOUN":
                    skills.add(child.text.lower())

    # Rule 4: Extract compound nouns (e.g., "machine learning")
    for token in doc:
        if token.dep_ == "compound":
            skill = f"{token.text.lower()} {token.head.text.lower()}"
            skills.add(skill)

    # Convert to a sorted list for better readability
    return sorted(list(skills))  # Sort the skills for better organization

def extract_section(text, keywords):
    text = text.lower()
    keywords = [keyword.lower() for keyword in keywords]
    for idx, line in enumerate(text.split('\n')):
        if any(keyword in line for keyword in keywords):
            section_lines = []
            for future_line in text.split('\n')[idx+1:]:
                if future_line.strip() == '':
                    break
                section_lines.append(future_line)
            return ' '.join(section_lines)
    return None

def parse_resume(file_path):
    text = extract_text(file_path)
    return {
        "name": extract_name(text),
        "contact_info": extract_contact_info(text),
        "education": extract_section(text, ["education", "academic"]),
        "experience": extract_section(text, ["experience", "work history"]),
        "skills": extract_skills(text)
    }

# Example usage



def extract_sections(text):
    # Create the model
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
    system_instruction="from the given text, extract the information from resume text and convert it to json.",
)

    chat_session = model.start_chat(
    history=[
    ]
    )


    prompt = f"{text}"
    response = chat_session.send_message(prompt)
    
    if response._done:  # Ensure the response is done
        # Access the first candidate's content
        text_content = response._result.candidates[0].content.parts[0].text
        return text_content
    else:
        raise ValueError("The response is not completed successfully.")


text = extract_text_from_pdf("/Users/devyanichavan/Documents/Projects/careerAI/Devyani Resume.pdf")
result = extract_sections(text)
print(result)