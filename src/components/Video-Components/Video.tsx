'use client'

import React, { useState ,useRef} from "react";

interface VideoProps {
  onNext: () => void;
  onVideoSelect?: (videoSrc: string) => void;
}

export default function Video({ onNext, onVideoSelect }: VideoProps) {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const videos = [
    { id: 1, src: "/videos/video1.mp4" },
    { id: 2, src: "/videos/video2.mp4" },
    { id: 3, src: "/videos/video3.mp4" },
    { id: 4, src: "/videos/video4.mp4" },
  ];

  const handleVideoSelect = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
    if (onVideoSelect) {
      onVideoSelect(videoSrc);
    }
  };

  const handleMouseEnter = (videoSrc: string) => {
    const video = videoRefs.current[videoSrc];
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (videoSrc: string) => {
    const video = videoRefs.current[videoSrc];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div id="video" className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl px-2">
        <h2 className="py-2 text-5xl font-black mb-10 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter text-center">
          Choose Background Video
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 place-items-center">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => handleVideoSelect(video.src)}
              onMouseEnter={() => handleMouseEnter(video.src)}
              onMouseLeave={() => handleMouseLeave(video.src)}
              className={`relative aspect-[9/16] w-[300px] h-[400px] rounded-xl overflow-hidden transition-all hover:scale-105
                ${selectedVideo === video.src 
                  ? "ring-4 ring-blue-500" 
                  : "ring-2 ring-transparent hover:ring-blue-300"
                }`}
            >
              <video
                ref={el => {
                  if (el) videoRefs.current[video.src] = el;
                }}
                src={video.src}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
              />
              {selectedVideo === video.src && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
                    Selected
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onNext}
            disabled={!selectedVideo}
            className='btn btn-wide'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
