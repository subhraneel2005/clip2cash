import React from "react";

export default function AiVoiceover() {
  return (
    <div id="aiVoiceover" className="flex items-center justify-center h-screen">
      <div className="mb-[200px]">
        <h2 className="py-2 text-5xl font-black mb-4 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter">
          AI Voiceover
        </h2>
        <p>AI Voiceover controls and settings...</p>
        <button className="btn mt-4 btn-wide btn-success">
          Generate Video
        </button>
      </div>
    </div>
  );
}
