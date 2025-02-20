import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({ modalContent, closeModal }) {
  const [activeSection, setActiveSection] = useState("video");

  const renderSection = () => {
    switch (activeSection) {
      case "chat":
        return <div>Chat with Video - Coming Soon!</div>;
      case "summary":
        return <div>Video Summary - Coming Soon!</div>;
      default:
        return (
          <iframe
            className="w-[900px] h-[520px]"
            src={`https://www.youtube.com/embed/${
              modalContent.links && modalContent.links[0] ? modalContent.links[0].split("v=")[1] : ""
            }`}
            title={modalContent.label}
            allowFullScreen
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white w-3/4 h-full p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl pt-3 font-bold">{modalContent.label}</h1>
          <IoClose onClick={closeModal} className="text-xl cursor-pointer" />
        </div>
        <div className="flex items-center justify-center mb-6 pt-8">
          {renderSection()}
        </div>

        {/* Sections Navigation */}
        <div className="p-4 mb-6">
          <div className="flex gap-5">
            <button
              className={`p-2 rounded-none text-center ${
                activeSection === "video"
                  ? "border-b-4 border-gray-800"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveSection("video")}
            >
              Video
            </button>
            <button
              className={`p-2 rounded-none text-center ${
                activeSection === "chat"
                  ? "border-b-4 border-gray-800"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveSection("chat")}
            >
              Chat
            </button>
            <button
              className={`p-2 rounded-none text-center ${
                activeSection === "summary"
                  ? "border-b-4 border-gray-800"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveSection("summary")}
            >
              Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 