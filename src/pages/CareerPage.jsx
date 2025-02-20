import React, { useState } from 'react';
import { getRoadmap } from '../feature_functions/CareerMap';


const CareerPage = () => {
  const [role, setRole] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetRoadmap = async () => {
    setLoading(true);
    let result = await getRoadmap(role);

    // Remove the ```html and ``` from the response
    if (result.startsWith('```html')) {
      result = result.slice(7); // Remove the starting ```html
    }
    if (result.endsWith('```')) {
      result = result.slice(0, -3); // Remove the ending ```
    }

    setRoadmap(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Career Roadmap</h1>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Enter your dream job role"
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-md"
      />
      <button
        onClick={handleGetRoadmap}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {loading ? 'Generating...' : 'Get Roadmap'}
      </button>
      {roadmap && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-4">Your Roadmap</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: roadmap }}
          />
        </div>
      )}
    </div>
  );
};

export default CareerPage;
