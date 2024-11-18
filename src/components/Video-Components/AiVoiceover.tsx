'use client';

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface AiVoiceoverProps {
  onVoiceSelect: (voice: string) => void;
  story: string;
  fontStyle: string;
  backgroundVideo: string;
}

const VOICES = {
  'Nova (Female, Warm)': {
    id: 'nova',
    description: 'Warm and natural female voice, perfect for storytelling',
    demoUrl: '/voice-samples/nova.wav' // Add these demo files to your public folder
  },
  'Onyx (Male, Warm)': {
    id: 'onyx',
    description: 'Warm and engaging male voice',
    demoUrl: '/voice-samples/onyx.wav'
  },
  'Echo (Male, Clear)': {
    id: 'echo',
    description: 'Clear and articulate male voice',
    demoUrl: '/voice-samples/echo.wav'
  },
  'Shimmer (Female, Clear)': {
    id: 'shimmer',
    description: 'Clear and expressive female voice',
    demoUrl: '/voice-samples/shimmer.wav'
  }
};

export default function AiVoiceover({ onVoiceSelect, story, fontStyle, backgroundVideo }: AiVoiceoverProps) {
  const router = useRouter();
  const [selectedVoice, setSelectedVoice] = useState('');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    onVoiceSelect(voiceId);
  };

  const playDemo = (voiceId: string, demoUrl: string) => {
    if (audioRef.current) {
      if (isPlaying === voiceId) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(null);
      } else {
        audioRef.current.src = demoUrl;
        audioRef.current.play();
        setIsPlaying(voiceId);
      }
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          story,
          fontStyle,
          backgroundVideo,
          voiceId: selectedVoice,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate video');
      }

      const data = await response.json();
      
      // Redirect to preview page with the generated video data
      router.push(`/preview?videoUrl=${encodeURIComponent(data.videoUrl)}`);

    } catch (err) {
      console.error('Error generating video:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate video');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="aiVoiceover" className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl">
        <h2 className="py-2 text-5xl font-black mb-8 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter text-center">
          Choose AI Voice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(VOICES).map(([name, voice]) => (
            <div key={voice.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="text-sm text-base-content/70">{voice.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <button
                    className={`btn btn-circle btn-sm ${isPlaying === voice.id ? 'btn-error' : 'btn-primary'}`}
                    onClick={() => playDemo(voice.id, voice.demoUrl)}
                  >
                    {isPlaying === voice.id ? '■' : '▶'}
                  </button>
                  <input
                    type="radio"
                    name="voice"
                    className="radio radio-primary"
                    checked={selectedVoice === voice.id}
                    onChange={() => handleVoiceSelect(voice.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <div className="alert alert-info w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Preview the voices before generating your video!</span>
          </div>

          <button 
            onClick={handleGenerate}
            className={`btn btn-wide btn-success ${!selectedVoice && 'btn-disabled'}`}
            disabled={!selectedVoice || isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="loading loading-spinner"></span>
                Generating Video...
              </>
            ) : (
              <>
                Generate Video
                <img src="/zap.svg" alt="zap" className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(null)}
        className="hidden"
      />
    </div>
  );
}
