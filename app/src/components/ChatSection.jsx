import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatSection() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chat = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `https://smeek3.jollydesert-73a8e64b.eastus.azurecontainerapps.io/chat/?chat_input=${userInput}`
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, type: "user" },
        { text: res?.data?.response, type: "bot" },
      ]);

      setUserInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-4 pt-20">
      <div className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg ${msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300 w-[70%]"}`}
              >
                <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center">
              <p className="text-sm font-semibold">Smeek is thinking 🧠...</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="p-3 bg-gray-300 rounded-full w-full focus:outline-none"
            placeholder="Message Smeek"
          />
          <button
            type="submit"
            onClick={chat}
            className="bg-gray-300 p-2 inline-flex items-center justify-center w-12 h-12 rounded-full"
          >
            <IoIosSend className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
