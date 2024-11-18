export interface VideoProject {
  id: string;
  story: string;
  fontStyle: string;
  backgroundVideo: string;
  voiceoverUrl?: string;
  subtitles?: Subtitle[];
  status: 'processing' | 'complete' | 'error';
}

export interface Subtitle {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

export interface WordTiming {
  word: string;
  start: number;
  end: number;
} 