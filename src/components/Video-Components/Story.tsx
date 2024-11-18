import React, { useState } from "react";

interface StoryProps {
  onNext: () => void;
  onStoryChange: (story: string) => void;
}

export default function Story({ onNext, onStoryChange }: StoryProps) {
  const [charCount, setCharCount] = useState(0);
  const CHAR_LIMIT = 500;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= CHAR_LIMIT) {
      setCharCount(text.length);
      onStoryChange(text);
    }
  };

  return (
    <div id="story" className="flex items-center justify-center h-screen">
      <div className="mb-[100px]">
        <h2 className="py-2 text-5xl mb-4 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black">
          Script
        </h2>
        <div className="relative">
          <textarea
            placeholder="Write your script here..."
            className="textarea textarea-bordered textarea-lg w-full max-w-2xl min-h-[300px]"
            onChange={handleTextChange}
            maxLength={CHAR_LIMIT}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {charCount}/{CHAR_LIMIT}
          </div>
        </div>
        <button 
          onClick={onNext} 
          className="btn mt-4 btn-wide"
          disabled={charCount === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
