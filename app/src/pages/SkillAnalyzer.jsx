import React, { useState } from 'react';
import { analyseSkills, analyseExperience, analyseProjects, analyseOthers } from '../feature_functions/SkillAnalyse';
import ReactMarkdown from 'react-markdown';

export default function SkillAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [projects, setProjects] = useState('');
  const [achievements, setAchievements] = useState('');
  const [others, setOthers] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const [parsedData, setParsedData] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const skillsResult = await analyseSkills(jobDescription, skills);
      const experienceResult = await analyseExperience(jobDescription, experience);
      const projectsResult = await analyseProjects(jobDescription, projects);
      const othersResult = await analyseOthers(jobDescription, achievements, others);

      setResults({
        skills: skillsResult,
        experience: experienceResult,
        projects: projectsResult,
        others: othersResult,
      });
    } catch (error) {
      console.error('Error analyzing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://sb02dg8p-8000.inc1.devtunnels.ms/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setParsedData(data.parsed_info);

      setSkills(
        data.parsed_info.skills.languages.join(', ') +
          ', ' +
          data.parsed_info.skills.frameworks.join(', ')
      );
      setExperience(
        data.parsed_info.workexperience
          .map(exp => `${exp.title} at ${exp.company}: ${exp.description}`)
          .join('\n')
      );
      setProjects(
        data.parsed_info.projects
          .map(proj => `${proj.name}: ${proj.description}`)
          .join('\n')
      );
      setAchievements(
        data.parsed_info.achievements
          .map(ach => `${ach.name}: ${ach.details}`)
          .join('\n')
      );
      setOthers(
        data.parsed_info.research.title + ' - ' + data.parsed_info.research.status
      );
    } catch (error) {
      console.error('Error parsing PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Resume Scanner</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg space-y-4">
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileUpload} 
          className="mb-4 p-2 border border-gray-300 rounded-lg shadow-sm" 
        />
        
        {/* Display parsed PDF data preview */}
        {parsedData && (
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm mb-4">
            <h2 className="text-lg font-semibold mb-2">Extracted PDF Data</h2>
            <p><strong>Skills:</strong> {skills}</p>
            <p className="mt-2"><strong>Experience:</strong></p>
            <ul className="list-disc pl-4">
              {parsedData.workexperience.map((exp, index) => (
                <li key={index}>
                  {exp.title} at {exp.company}: {exp.description}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>Projects:</strong></p>
            <ul className="list-disc pl-4">
              {parsedData.projects.map((proj, index) => (
                <li key={index}>
                  {proj.name}: {proj.description}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>Achievements:</strong></p>
            <ul className="list-disc pl-4">
              {parsedData.achievements.map((ach, index) => (
                <li key={index}>
                  {ach.name}: {ach.details}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>Research:</strong> {parsedData.research.title} - {parsedData.research.status}</p>
          </div>
        )}
        
        {/* Input fields remain available for further editing */}
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter Job Description"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="4"
        />
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter Your Skills"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="2"
        />
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter Your Experience"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="2"
        />
        <textarea
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          placeholder="Enter Your Projects"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="2"
        />
        <textarea
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          placeholder="Enter Your Achievements"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="2"
        />
        <textarea
          value={others}
          onChange={(e) => setOthers(e.target.value)}
          placeholder="Enter Other Relevant Information"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows="2"
        />
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition shadow-md"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {results && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <button 
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-full shadow-md transition ${activeTab === 'skills' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Skills
            </button>
            <button 
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 rounded-full shadow-md transition ${activeTab === 'experience' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Experience
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-full shadow-md transition ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('others')}
              className={`px-4 py-2 rounded-full shadow-md transition ${activeTab === 'others' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Others
            </button>
          </div>
          <div className="space-y-4">
            {activeTab === 'skills' && (
              <div>
                <h3 className="font-bold">Skills Analysis:</h3>
                <ReactMarkdown className="text-gray-700">{results.skills}</ReactMarkdown>
              </div>
            )}
            {activeTab === 'experience' && (
              <div>
                <h3 className="font-bold">Experience Analysis:</h3>
                <ReactMarkdown className="text-gray-700">{results.experience}</ReactMarkdown>
              </div>
            )}
            {activeTab === 'projects' && (
              <div>
                <h3 className="font-bold">Projects Analysis:</h3>
                <ReactMarkdown className="text-gray-700">{results.projects}</ReactMarkdown>
              </div>
            )}
            {activeTab === 'others' && (
              <div>
                <h3 className="font-bold">Others Analysis:</h3>
                <ReactMarkdown className="text-gray-700">{results.others}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
