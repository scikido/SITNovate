import { useState } from "react";
import axios from "axios";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function SummarySection({ summary, loading }) {
  return (
    <div>
      {loading ? (
        <div>
          <p className="text-sm font-semibold pt-3">
            Thryv is summarizing... 🧠
          </p>
        </div>
      ) : (
        <div className="flex">
          <img width={700} height={700} alt="Summary" />
          <div className="p-3 rounded-lg">
            <Markdown remarkPlugins={[remarkGfm]}>{summary}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
