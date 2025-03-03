import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import LearningPage from "./components/LearningPage";
import { Dashboard } from "./pages/Dashboard";
import CareerPage from "./pages/CareerPage";
import SkillAnalyzer from "./pages/SkillAnalyzer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/skill" element={<SkillAnalyzer />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
