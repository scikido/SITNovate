import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Brain, 
  Target, 
  FileSearch, 
  FileEdit, 
  MessageSquare, 
  Briefcase, 
  Map, 
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const mockData = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 45 },
  { name: 'Week 4', progress: 60 },
  { name: 'Week 5', progress: 75 },
  { name: 'Week 6', progress: 85 },
];

const features = [
  { icon: Brain, title: 'Learning Path', description: 'AI-customized learning journey' },
  { icon: Target, title: 'Skill Analysis', description: 'Gap assessment & recommendations' },
  { icon: FileSearch, title: 'ATS Scanner', description: 'Job market fit analysis' },
  { icon: FileEdit, title: 'Resume Builder', description: 'AI-powered optimization' },
  { icon: MessageSquare, title: 'AI Mentor', description: 'Personal career guidance' },
  { icon: Briefcase, title: 'Projects', description: 'Real-world experience' },
  { icon: Map, title: 'Career Map', description: 'Future path visualization' },
  { icon: User, title: 'Personal Growth', description: 'AI personality coach' },
];

const sidebarLinks = [
  { icon: Brain, label: 'Dashboard', id: 'dashboard' },
  { icon: Target, label: 'Goals', id: 'goals' },
  { icon: FileSearch, label: 'Job Search', id: 'jobs' },
  { icon: MessageSquare, label: 'Messages', id: 'messages' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleFeatureClick = (title: string) => {
    setActiveSection(title.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-white w-64 min-h-screen shadow-lg fixed left-0 top-0 z-20"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">CareerAI</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveSection(link.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === link.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                onClick={() => setNotifications(0)}
              >
                <Bell size={24} />
                {notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {notifications}
                  </motion.div>
                )}
              </motion.button>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Your Learning Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your progress and accelerate your career</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleFeatureClick(feature.title)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left w-full"
              >
                <feature.icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Steps</h2>
              <ul className="space-y-3">
                {['Complete Python for Data Science course', 'Update portfolio with recent projects', 'Schedule mock interview with AI mentor'].map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => console.log(`Clicked: ${step}`)}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {step}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Skill Progress</h2>
              <div className="space-y-4">
                {[
                  { name: 'Technical Skills', progress: 75 },
                  { name: 'Soft Skills', progress: 85 }
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-700">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}