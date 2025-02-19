# Career roadmap - create a roadmap of your dream job role
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])


def get_roadmap(role):
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
        system_instruction=
        "I will give you my dream Job Role and you must create a proper roadmap that i must follow to achieve it.",
    )

    chat_session = model.start_chat(history=[])
    prompt = f"{role}"
    response = chat_session.send_message(prompt)

    print(response.text)
