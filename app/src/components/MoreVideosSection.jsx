import { useEffect, useState } from "react";


function VideoCard({ link, index }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchVideoTitle = async () => {
      try {
        const videoId = link.split("v=")[1];
        const response = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
        );
        const data = await response.json();
        setTitle(data.title || `Video ${index + 1}`);
      } catch (error) {
        console.error("Error fetching video title:", error);
        setTitle(`Video ${index + 1}`);
      }
    };

    fetchVideoTitle();
  }, [link, index]);

  return (
    <div className="border rounded-md shadow-xl mb-16">
      <img
        width={400}
        height={200}
        className="w-full rounded-md h-40 object-cover mb-1"
        src={`https://img.youtube.com/vi/${link.split("v=")[1]}/hqdefault.jpg`}
        alt={`Video ${index + 1}`}
      />
      <a
        href={link}
        className="hover:underline block p-2 text-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    </div>
  );
}

export default function VideoGrid({ links }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8">
      {links.map((link, index) => (
        <VideoCard key={index} link={link} index={index} />
      ))}
    </div>
  );
}
