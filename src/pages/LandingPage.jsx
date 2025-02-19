import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold animate-fade-in">
          Welcome to <span className="text-blue-400">Thryv</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300">AI-powered Skilling & Career Acceleration</p>
        

        <div className="mt-8 space-y-3">
          {[
            "Personalized Learning",
            "AI Career Readiness Assessment",
            "ATS & Job Market Fit Scanner",
            "Resume Optimization",
            "AI Mentor",
            "Freelance Project Deployment",
            "Career Roadmap",
            "Personality Development Chatbot"
          ].map((feature, index) => (
            <p key={index} className="text-gray-400">
              ✅ {feature}
            </p>
          ))}
        </div>


        <button
          onClick={() => navigate("/auth")}
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-all animate-bounce"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
