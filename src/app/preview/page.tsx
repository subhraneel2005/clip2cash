'use client';

import { useSearchParams } from 'next/navigation';
import VideoPreview from "@/components/Video-Components/VideoPreview";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('videoUrl');

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>No video URL provided</span>
        </div>
      </div>
    );
  }

  return (
    <VideoPreview
      videoUrl={videoUrl}
      subtitles={[]}  // We'll handle subtitles later
      fontStyle=""    // We'll handle font style later
    />
  );
} 