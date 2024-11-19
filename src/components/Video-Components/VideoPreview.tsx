'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface VideoPreviewProps {
  videoUrl: string;
  subtitles?: Array<{
    text: string;
    startTime: number;
    endTime: number;
  }>;
  fontStyle?: string;
}

export default function VideoPreview({ videoUrl }: VideoPreviewProps) {
  const router = useRouter();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'minecraft-story.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleVideoError = () => {
    setError('Failed to load video. Please try again.');
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  React.useEffect(() => {
    console.log('Video URL:', videoUrl);
  }, [videoUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
            Your Video is Ready!
          </h2>
          <button 
            onClick={() => router.push('/create')} 
            className="btn btn-ghost"
          >
            Create Another
          </button>
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-base-200">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-200">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src={videoUrl.startsWith('/') ? videoUrl : `/${videoUrl}`}
            className="w-full aspect-video"
            controls
            onLoadedData={handleVideoLoad}
            onError={(e) => {
              console.error('Video error:', e);
              handleVideoError();
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button 
            onClick={() => videoRef.current?.play()} 
            className="btn btn-primary btn-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </button>
          <button 
            onClick={handleDownload} 
            className="btn btn-success btn-wide"
          >
            Download MP4
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="alert alert-info mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Your video is ready to download. You can also create another video!</span>
        </div>
      </div>
    </div>
  );
} 