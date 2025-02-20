import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import { generateContent } from "../feature_functions/LearningPath";
import React from "react";
import "reactflow/dist/style.css";
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import Modal from "./Modal";

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

export default function Learn() {
  const [topic, setTopic] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const getCourseContent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fetchedData = await generateContent(topic);

      const newNodes = fetchedData.map((item, index) => ({
        id: `${index + 1}`,
        data: {
          label: item.topic,
          links: item.links,
        },
        position: { x: (index % 4) * 200, y: Math.floor(index / 4) * 120 },
      }));

      const newEdges = fetchedData.slice(1).map((_, index) => ({
        id: `e${index}-${index + 1}`,
        source: `${index + 1}`,
        target: `${index + 2}`,
        animated: true,
      }));

      setNodes(newNodes);
      setEdges(newEdges);
      setCourseData(fetchedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onNodeClick = (event, node) => {
    setModalContent({
      label: node.data.label,
      links: node.data.links,
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
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

        <form onSubmit={getCourseContent} className="flex justify-center items-center gap-2 mt-8">
          <input
            className="bg-gray-100 w-[500px] px-2 py-2 rounded-full focus:outline-none placeholder:pl-4"
            type="text"
            placeholder="What do you want to learn today?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            className="bg-[#333333] px-6 py-1 text-white rounded-md flex items-center gap-1"
            type="submit"
          >
            Learn <FaSearch size={16} />
          </button>
        </form>

        {loading ? (
          <div className="mt-24">
            <Skeleton count={10} height={50} />
          </div>
        ) : (
          <div className="relative h-[900px] mt-24">
            <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick}>
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        )}

        {modalContent && (
          <Modal modalContent={modalContent} closeModal={closeModal} />
        )}
      </div>
    </>
  );
}


