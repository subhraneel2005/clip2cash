import { Subtitle } from '@/types';
import ffmpeg from 'fluent-ffmpeg';

interface VideoProcessingProps {
  backgroundVideo: string;
  voiceoverUrl: string;
  subtitles: Subtitle[];
  fontStyle: string;
}

export async function combineVideoWithSubtitles({
  backgroundVideo,
  voiceoverUrl,
  subtitles,
  fontStyle,
}: VideoProcessingProps): Promise<string> {
  // Generate SRT file from subtitles
  const srtContent = generateSRT(subtitles);
  
  // Use FFmpeg to combine everything
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(backgroundVideo)
      .input(voiceoverUrl)
      .addOption('-vf', `subtitles=subtitles.srt:force_style='FontName=${fontStyle},FontSize=24,Alignment=10'`)
      .toFormat('mp4')
      .on('end', () => {
        resolve('path/to/final/video.mp4');
      })
      .on('error', (err: any) => {
        reject(err);
      })
      .save('path/to/final/video.mp4');
  });
}

function generateSRT(subtitles: Subtitle[]): string {
  return subtitles
    .map((sub, index) => {
      const startTime = formatTime(sub.startTime);
      const endTime = formatTime(sub.endTime);
      
      return `${index + 1}\n${startTime} --> ${endTime}\n${sub.text}\n\n`;
    })
    .join('');
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${pad(ms, 3)}`;
}

function pad(num: number, size: number = 2): string {
  return num.toString().padStart(size, '0');
} 