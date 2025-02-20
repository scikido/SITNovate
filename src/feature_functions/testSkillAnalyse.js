import { analyseSkills, analyseExperience, analyseProjects, analyseOthers } from './SkillAnalyse.js';

// Sample inputs
const jobDescription = `At EY, you'll have the chance to build a career as unique as you are...`;
const skills = `Languages: Python, HTML, CSS, C, C++`;
const experience = `Co-Founder | IdeaTribe engagement...`;
const project = `EMIX | Github Live...`;
const achievements = `Logithon Runner Up | LINK...`;
const others = `RESEARCH WORK...`;

// Test the functions
const testFunctions = async() => {
    console.log("Testing analyseSkills...");
    const skillsResult = await analyseSkills(jobDescription, skills);
    console.log("Skills Analysis Result:", skillsResult);

    console.log("Testing analyseExperience...");
    const experienceResult = await analyseExperience(jobDescription, experience);
    console.log("Experience Analysis Result:", experienceResult);

    console.log("Testing analyseProjects...");
    const projectsResult = await analyseProjects(jobDescription, project);
    console.log("Projects Analysis Result:", projectsResult);

    console.log("Testing analyseOthers...");
    const othersResult = await analyseOthers(jobDescription, achievements, others);
    console.log("Others Analysis Result:", othersResult);
};

// Run the tests
testFunctions();