# Ai-powered career readiness assessment - AI interview based on resume and JD
import os
import google.generativeai as genai
from dotenv import load_dotenv
from youtubesearchpython import VideosSearch
import ast

# Load environment variables from .env file
load_dotenv()

skills = """Languages: Python, HTML, CSS, C, C++
● Frameworks: Django, Flask, FastAPI
● Tools & Platform: Azure, AWS, Google Colab Notebooks, Docker, Git, Github
● Generative AI: LLMs, Ollama, HuggingFace, Langchain, OpenAI
● Soft Skills: People Management (Scrum), Excellent communication, Decision Making, Leadership
"""
experience = """Co-Founder | IdeaTribe engagement
DEC 2024 - JUNE 2024
○ Implemented a streamlined content strategy for Project Innoscript, resulting in a 30% increase in client satisfaction and
Technical Content Writer | Freelance AUG 2023 - DEC 2023
○ Crafted compelling technical content on topics such as Power BI, Python, Data Science, and Machine Learning for diverse
global clients, resulting in over 100k engaged readers.
○ Demonstrated expertise in technical subjects and adeptness in communication to captivate audiences and meet client
objectives.
"""
project = """EMIX | Github Live
○ Developed an AI-powered MJML email generator, reducing email design time by 85% for non-technical users.
○ Achieved 98% user satisfaction by implementing intuitive, no-code features, enabling seamless customization and one-click
MJML export.
○ Boosted productivity by 70% through automated email generation, empowering users to focus on content creation rather than
coding.
○ Enhanced template variety by 40% by integrating user-friendly design prompts and customization options, resulting in
dynamic, responsive emails compatible across major email clients.
SMEEK | Github Live
○ Increased student learning efficiency by 70% by developing and deploying Smeek AI, an AI-powered study tool that generates
tailored topic lists and curated YouTube resources.
○ Automated study material transformation, converting PDFs into interactive flashcards and quizzes, which improved knowledge
retention by 45%.
○ Enabled personalized learning pathways by generating adaptive study content, resulting in an 88% user satisfaction rate.
○ Enhanced user engagement and consistency in study habits, with 65% of users reporting increased academic confidence
after using Smeek AI’s interactive tools.
AI Powered Self Learning PDF to Data Converter | Github
○ Developed an AI-powered self-learning PDF to-data converter application, resulting in a 40% reduction in data extraction time
compared to traditional methods.
○ Demonstrated expertise in programming languages such as Python and large language models.
"""
achievements = """ Logithon Runner Up | LINK ○ Learnt about various ML models and streamlit
○ Bagged 50k for runner up.
April 2024

"""
others = """RESEARCH WORK
“Optimizing AI for Sustainability: Reducing Energy Footprint in Training and Inference for Green Computing” - (about to be published)
"""

jd = """At EY, you’ll have the chance to build a career as unique as you are, with the global scale, support, inclusive culture and technology to become the best version of you. And we’re counting on your unique voice and perspective to help EY become even better, too. Join us and build an exceptional experience for yourself, and a better working world for all.

Cloud AI Engineer

The opportunity

We are the only professional services organization who has a separate business dedicated exclusively to the financial services marketplace. Join Digital Engineering Team and you will work with multi-disciplinary teams from around the world to deliver a global perspective. Aligned to key industry groups including Asset management, Banking and Capital Markets, Insurance and Private Equity, Health, Government, Power and Utilities, we provide integrated advisory, assurance, tax, and transaction services. Through diverse experiences, world-class learning and individually tailored coaching you will experience ongoing professional development. That’s how we develop outstanding leaders who team to deliver on our promises to all our stakeholders, and in so doing, play a critical role in building a better working world for our people, for our clients and for our communities. Sound interesting? Well, this is just the beginning. Because whenever you join, however long you stay, the exceptional EY experience lasts a lifetime.

We are looking for a talented and motivated AI Engineer to join our team and work alongside our AI Architect. The ideal candidate will have a strong background in AI/ML, data engineering, and cloud technologies, with a focus on AI & Generative AI (GenAI) technologies. You will be responsible for developing, deploying, and optimizing AI models and solutions, ensuring they meet the performance, scalability, and security requirements of our organization.

EY Digital Engineering is a unique, industry-focused business unit that provides a broad range of integrated services that leverage deep industry experience with strong functional capability and product knowledge. The Digital Engineering practice works with clients to analyse, formulate, design, mobilize and drive digital transformation initiatives. We advise clients on their most pressing digital challenges and opportunities surround business strategy, customer, growth, profit optimization, innovation, technology strategy, and digital transformation. We also have a unique ability to help our clients translate strategy into actionable technical design, and transformation planning/mobilization. Through our unique combination of competencies and solutions, EY’s DE team helps our clients sustain competitive advantage and profitability by developing strategies to stay ahead of the rapid pace of change and disruption and supporting the execution of complex transformations.

Your Key Responsibilities

AI/ML Model Development
Develop and train machine learning models using frameworks such as Autogen, PydanticAI, Langchain, TensorFlow, PyTorch, Scikit-learn.
Leverage large language models (LLMs) and work on cloud LLM deployments.
Build AI agents and have a solid understanding of agentic frameworks.
Implement and fine-tune AI models for various business applications.
AI/ML Deployment and Optimization
Deploy machine learning models on cloud platforms (e.g., AWS, Azure, GCP).
Optimize AI pipelines for both real-time and batch processing.
Understand concepts around model fine-tuning, distillation, and optimization.
Monitor and maintain the performance of deployed models, ensuring they meet business requirements.
Cloud Integration
Integrate AI/ML models with existing cloud infrastructure.
Utilize cloud services (e.g., AWS SageMaker, Azure AI, GCP AI Hub) to manage AI workloads.
Ensure compliance with data privacy and security standards.
Collaboration and Support
Work closely with the AI Architect to design scalable AI solutions.
Collaborate with cross-functional teams, including data scientists, engineers, and business stakeholders.
Provide technical support and troubleshooting for AI-related issues.
Continuous Learning and Innovation
Stay updated on the latest advancements in AI/ML technologies.
Experiment with new AI tools and frameworks to enhance existing solutions.
Contribute to the adoption of best practices for AI model lifecycle management.
Skills And Attributes For Success

Proficiency in AI/ML frameworks such as Autogen, PydanticAI, Langchain, TensorFlow, PyTorch, Scikit-learn.
Experience with cloud platforms: AWS, Azure, GCP.
Understanding of data engineering, ETL pipelines, and big data tools (e.g., Apache Spark, Hadoop).
Hands-on experience with containerization and orchestration tools (Docker, Kubernetes).
Knowledge of DevOps practices for AI/ML (MLOps).
Strong understanding of deep learning models, including DNN, LSTM, Transformers, RL, and GNN.
Experience with Generative AI technologies, including LLMs, model fine-tuning, distillation, and optimization.
Strong problem-solving and analytical skills.
Excellent communication and teamwork abilities.
Ability to work in a fast-paced, collaborative environment.

Preferred Qualifications:

Certifications in cloud platforms (e.g., AWS Certified Solutions Architect, Azure AI Engineer) are a plus.
Experience: At least 5+ years in AI-related roles
Proven experience in developing and deploying AI solutions with Python, JavaScript
Strong background in machine learning, deep learning, and data modelling.
Experience in integrating AI models with cloud infrastructure.
Agile Methodologies: Familiarity with Agile development practices and methodologies.

Education:

Bachelor’s or master’s degree in computer science, Engineering, or a related field.

"""

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
def analyse_skills(jd, skills):
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
    system_instruction="i will give you job description, check if the skills required in job description are present in my skills section.",
    )

    chat_session = model.start_chat(
    history=[
        {
        "role": "user",
        "parts": [
            "Job Description: ob Title: AI/ML Engineer\n\nLocation: 100% Remote with Quarterly Travel to Company HQ\n\nCompensation: Based on Experience and Qualifications, Subject to Base Salary and Bonus\n\nAbout East 57th Street Partners International\n\nEast 57th Street Partners International partners with companies at the forefront of technology to provide innovative solutions in AI and machine learning. Through our Executive and Direct Hire Search Practice, we place technical leaders who drive cutting-edge development and optimization.\n\nPosition Overview\n\nOur client is seeking an AI/ML Engineer to join their remote team and lead the development of machine learning models to enhance their product offerings. The AI/ML Engineer will work closely with data scientists and software developers to build, train, and deploy models that solve real-world problems. This position requires quarterly travel to the company’s headquarters for key strategic discussions and collaboration.\n\nKey Responsibilities\n\nDesign, develop, and implement AI and machine learning algorithms.\nCollaborate with cross-functional teams to integrate AI solutions into existing products.\nUse advanced statistical techniques to identify patterns and build predictive models.\nTrain machine learning models, optimize their performance, and monitor outcomes.\nStay updated on the latest advancements in AI/ML technologies and implement best practices.\nWork with large datasets to develop scalable AI solutions.\nQualifications\n\nBachelor’s or Master’s degree in computer science, AI, machine learning, or a related field.\nProven experience in AI/ML development, including model building and deployment.\nProficiency in Python, TensorFlow, PyTorch, and other AI/ML frameworks.\nStrong problem-solving and analytical skills.\nAbility to work independently in a remote setting while collaborating with global teams.\nCompensation and Benefits\n\nCompetitive compensation package based on experience and qualifications, including base salary and bonus.\nAccess to cutting-edge AI/ML projects and professional development opportunities.\n\nSkills: Languages: Python, HTML, CSS, C, C++\n● Frameworks: Django, Flask, FastAPI\n● Tools & Platform: Azure, AWS, Google Colab Notebooks, Docker, Git, Github\n● Generative AI: LLMs, Ollama, HuggingFace, Langchain, OpenAI\n● Soft Skills: People Management (Scrum), Excellent communication, Decision Making, Leadership\n",
        ],
        },
        {
        "role": "model",
        "parts": [
            "Based on the provided job description and your skills section, here's a comparison:\n\n**Skills Matched:**\n\n* **Python:** You list Python as a skill, which is explicitly required.\n* **TensorFlow & PyTorch:**  You don't explicitly mention these, but your familiarity with other AI/ML frameworks suggests you likely possess transferable skills.  The job description doesn't specify the *level* of proficiency needed, so this is a point to emphasize in your application.  Mentioning any projects where you've used similar frameworks would be beneficial.\n* **AI/ML Development:** Your skills in frameworks like TensorFlow and PyTorch and your experience with Generative AI strongly suggest experience in AI/ML development.\n* **Problem-solving & Analytical Skills:** You mention these as soft skills, which are essential.\n* **Working Independently & Collaboration:** You mention experience with Scrum, implying experience working in teams and remotely.  The job description emphasizes both independent work and collaboration.\n\n**Skills Partially Matched or Requiring Further Clarification:**\n\n* **Model Building & Deployment:** Your skills in frameworks and Generative AI imply you have experience in model building.  To strengthen your application, quantify your experience (e.g., number of models built, deployed models, types of models).  Explicitly mentioning deployment experience would be beneficial.\n* **Working with Large Datasets:**  While you have experience with cloud platforms (Azure, AWS, Google Colab), the job description implies experience managing and processing *very large* datasets.  You may want to elaborate on your experience handling large datasets and the scale of your projects.\n* **Advanced Statistical Techniques:** The job description mentions this.  You should clarify in your application whether your skills include techniques relevant to building predictive models.\n\n\n**Skills Not Matched:**\n\n* There's no direct mention of experience with the specific tools or platforms listed in the job description (other than the cloud platforms).\n\n\n**Overall Assessment:**\n\nYour skills are largely relevant. However, to maximize your chances, you should:\n\n1. **Highlight your experience:** Quantify your achievements in your resume and cover letter, focusing on accomplishments that directly address the keywords and requirements in the job description.\n2. **Address the gaps:** Explicitly mention your experience with model deployment and handling very large datasets (even if it's not extensive).  This will show proactive problem-solving.\n3. **Show, don't just tell:**  Use the STAR method (Situation, Task, Action, Result) to describe your experiences in your resume and cover letter, providing specific examples.\n\n\nIn summary, you have a solid foundation of skills.  However, tailoring your resume and cover letter to directly address the specific requirements and using quantifiable achievements will significantly improve your chances of getting an interview.\n",
        ],
        },
    ]
    )
    prompt = f"Job Description: {jd} /n Skills: {skills}"
    response = chat_session.send_message(prompt)
    
    if response._done:  # Ensure the response is done
        # Access the first candidate's content
        text_content = response._result.candidates[0].content.parts[0].text
        return text_content
    else:
        raise ValueError("The response is not completed successfully.")


def analyser_experience(jd, experience):
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
    system_instruction="i will give you job description, check if the experience required in job description are present in my experience section.",
)

    chat_session = model.start_chat(
    history=[
    ]
    )


    prompt = f"Job Description: {jd} /n experience: {experience}"
    response = chat_session.send_message(prompt)
    
    if response._done:  # Ensure the response is done
        # Access the first candidate's content
        text_content = response._result.candidates[0].content.parts[0].text
        return text_content
    else:
        raise ValueError("The response is not completed successfully.")




def analyser_project(jd, project):
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
    system_instruction="i will give you job description, check if whatever projects I have built align with the job description, or what can i built to get noticed easily by my projects.",
)

    chat_session = model.start_chat(
    history=[
    ]
    )


    prompt = f"Job Description: {jd} /n project: {project}"
    response = chat_session.send_message(prompt)
    
    if response._done:  # Ensure the response is done
        # Access the first candidate's content
        text_content = response._result.candidates[0].content.parts[0].text
        return text_content
    else:
        raise ValueError("The response is not completed successfully.")

def analyser_others(jd, achievements, others):
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
    system_instruction="i will give you job description, check if the achievements and other details I mentioned are aligning with job description and help me to get this job?",
)

    chat_session = model.start_chat(
    history=[
    ]
    )


    prompt = f"Job Description: {jd} /n achievements & others: {achievements} & {others}"
    response = chat_session.send_message(prompt)
    
    if response._done:  # Ensure the response is done
        # Access the first candidate's content
        text_content = response._result.candidates[0].content.parts[0].text
        return text_content
    else:
        raise ValueError("The response is not completed successfully.")



# analyse_skills(jd, skills)
# analyser_experience(jd, experience)
# analyser_project(jd, project)
# ans = analyser_others(jd, achievements, others)
# print(ans)