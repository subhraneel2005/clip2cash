import React from "react";

interface VideoProps {
  onNext: () => void;
}

export default function Video({ onNext }: VideoProps) {
  return (
    <div id="video" className="flex items-center justify-center h-screen">
      <div className="mb-[200px]">
        <h2 className="py-2 text-5xl font-black mb-4 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter">
          Video
        </h2>
        <p>Video settings and options...</p>
        <button onClick={onNext} className="btn mt-4 btn-wide">
          Next
        </button>
      </div>
    </div>
  );
}
