import React from "react";

interface StoryProps {
  onNext: () => void;
}

export default function Story({ onNext }: StoryProps) {
  return (
    <div id="story" className="flex items-center justify-center h-screen">
      <div className="mb-[100px]">
        <h2 className="py-2 text-5xl mb-4 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black">
          Script
        </h2>
        <textarea
          placeholder="Write your script here..."
          className="textarea textarea-bordered textarea-lg w-full max-w-2xl min-h-[300px]"
        ></textarea>
        <button onClick={onNext} className="btn mt-4 btn-wide">
          Next
        </button>
      </div>
    </div>
  );
}
