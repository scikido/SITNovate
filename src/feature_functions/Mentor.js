// import googleTTS from 'google-tts-api';
// import player from 'play-sound';
// import fs from 'fs';
// import https from 'https';

// const speakText = async (text) => {
//     try {
//         const url = await googleTTS.getAudioUrl(text, {
//             lang: 'en',
//             slow: false,
//             host: 'https://translate.google.com',
//         });

//         const file = 'output.mp3';
//         const fileStream = fs.createWriteStream(file);

//         https.get(url, (response) => {
//             response.pipe(fileStream);
//             fileStream.on('finish', () => {
//                 console.log('Playing audio...');
//                 player().play(file, (err) => {
//                     if (err) console.error('Error playing audio:', err);
//                     fs.unlinkSync(file); 
//                 });
//             });
//         });
//     } catch (err) {
//         console.error('Error:', err);
//     }
// };

// // Example usage
// speakText("Hello, this is an ES6 Node.js text-to-speech example.");

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
  const apiKey = "AIzaSyAa4e64ARQajPap0LC38bE0HvRnrsndBIc";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Give me only all questions in comma seperated list format enclosed in square brackets.",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "You are an interviewer hiring for Job Role of Software Engineer III - AI/ML Engineer and job description is given below. Your task is to interview me. My skills and experience are accordingly mentioned. \n\nSkills: Python, GenAI\nExperience: 3+ years IT engineer\n\nJob Description: We have an exciting and rewarding opportunity for you to take your software engineering career to the next level.\n\nAs a Software Engineer III at JPMorgan Chase within the Asset & Wealth Management, you serve as a seasoned member of an agile team to design and deliver trusted market-leading technology products in a secure, stable, and scalable way. You are responsible for carrying out critical technology solutions across multiple technical areas within various business functions in support of the firm's business objectives.\n\nJob Responsibilities\n\nDesign, develop, and deploy LLM models and pipelines to tackle business challenges and opportunities\nUtilize techniques like prompt engineering, model fine-tuning, RAGs, and LLM Agents for use cases such as Q&A, summarization, and automation\nEmploy firm-standard tools and platforms to set up automated AI/ML pipelines that can be quickly re-trained and deployed\nCollaborate with stakeholders and cross-functional teams to gather requirements and comprehend ML/LLM use cases and data needs\nOptimize and maintain cloud-based infrastructure to facilitate rapid ML model deployment and integration with workflows\nConduct data analysis and preprocessing to prepare datasets for model training and evaluation\nMonitor and maintain deployed models, implementing necessary updates and improvements to address business priorities and model drift\nStay informed about the latest advancements in machine learning, GenAI, and NLP technologies\nCommunicate findings and insights effectively to both technical and non-technical stakeholders.\n\nRequired Qualifications, Capabilities, And Skills\n\nFormal training or certification on software engineering concepts and 3+ years applied experience\nExperience in ML/LLM model development, deployment, and integration.\nStrong programming skills in Python and experience with ML frameworks such as TensorFlow, PyTorch, and scikit-learn.\nGood understanding of statistical concepts of hypothesis testing, data distributions and inference underlying and governing choice and working of ML algorithms.\nStrong fundamentals in natural language processing (NLP) and experience using large language models (LLMs) such as GPT, Llama, BERT, or similar.\nFamiliarity with containerization technologies like Docker and orchestration tools like Kubernetes.\nFamiliarity with cloud platforms (e.g., AWS, Google Cloud, Azure) and services like Sagemaker/Azure ML for deploying machine learning models.\nStrong problem-solving skills and the ability to work independently and collaboratively in a fast-moving organizational setup.\nExcellent problem-solving skills and the ability to work independently and collaboratively.\nStrong communication and interpersonal skills, with experience in working with stakeholders and cross-functional teams.\n\nPreferred Qualifications, Capabilities, And Skills\n\nExperience with big data technologies such as Spark is a big plus.\nExperience of CI/CD pipelines and DevOps practices/MLOps for ML model deployment.\nDemonstrable portfolio of projects and Open source community contributions.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\"Tell me about your experience with Python and its application in AI/ML projects.\", \"Describe your experience with Generative AI (GenAI) models and techniques.\", \"Can you explain your understanding of Large Language Models (LLMs) and their applications?\", \"Walk me through your experience with prompt engineering, model fine-tuning, Retrieval Augmented Generation (RAGs), and LLM Agents.\", \"Describe your experience designing, developing, and deploying LLM models and pipelines.\", \"How have you used statistical concepts such as hypothesis testing, data distributions, and inference in your ML work?\", \"How familiar are you with natural language processing (NLP) techniques?\", \"Describe your experience with ML frameworks such as TensorFlow, PyTorch, and scikit-learn.\", \"How have you addressed model drift in your previous projects?\", \"How would you approach building an automated AI/ML pipeline for a specific business problem?\", \"Explain your experience with containerization technologies like Docker and orchestration tools like Kubernetes.\", \"Describe your experience with cloud platforms (AWS, Google Cloud, Azure) and their machine learning services.\", \"How do you handle data preprocessing and cleaning for machine learning models?\", \"Describe your experience collaborating with stakeholders and cross-functional teams.\", \"How would you communicate complex technical information to both technical and non-technical audiences?\", \"Tell me about a time you had to troubleshoot and resolve a complex technical problem.\", \"Describe your experience with big data technologies such as Spark.\", \"Do you have experience with CI/CD pipelines and DevOps or MLOps practices for ML model deployment?\", \"Can you share any projects or open-source contributions that showcase your skills?\", \"Why are you interested in this position at JPMorgan Chase?\"]\n"},
          ],
        },
      ],
    });




    
    const skills= "Python, GenAI"
    const experience= "3+ years IT engineer"
    const job_description = "Responsible for developing AI/ML models and deploying solutions."
    

  const prompt = `You are an interviewer hiring for Job Role of Software Engineer III - AI/ML Engineer and job description is given below. Your task is to interview me. My skills and experience are accordingly mentioned. Give me only all questions in comma seperated list format enclosed in square brackets.

Skills: ${skills}
Experience: ${experience}
Job Description: ${job_description}`
    const result = await chatSession.sendMessage(prompt);
    const results = result.text;
    console.log(results)

    // Correctly split the results into questions
    const questions = results.split(/,\s+/); // Split by comma followed by space

    // Append '?' back to each question
    const formattedQuestions = questions.map(q => q.trim() + '?'); // Trim whitespace and add '?'
    
    console.log(formattedQuestions); // Log the formatted questions
    return { questions: formattedQuestions }; // Return the formatted questions
  }
  
  run();
  
