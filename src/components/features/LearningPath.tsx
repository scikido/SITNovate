import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const courses = [
  {
    title: 'Python for Data Science',
    progress: 75,
    duration: '8 weeks',
    status: 'In Progress',
  },
  {
    title: 'Machine Learning Fundamentals',
    progress: 0,
    duration: '12 weeks',
    status: 'Not Started',
  },
  {
    title: 'Web Development Basics',
    progress: 100,
    duration: '6 weeks',
    status: 'Completed',
  },
];

export function LearningPath() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <header>
          <h1 className="text-3xl font-bold text-gray-800">Your Learning Path</h1>
          <p className="text-gray-600 mt-2">Personalized curriculum based on your career goals</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b last:border-b-0 pb-6 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{course.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <div className="text-sm font-medium text-gray-900">{course.progress}%</div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}