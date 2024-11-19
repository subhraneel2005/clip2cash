import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import ffmpeg from '@/lib/ffmpeg-config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    console.log('API route started');
    
    const body = await req.json();
    console.log('Received request body:', body);

    const { story, fontStyle, backgroundVideo, voiceId } = body;

    // 1. Generate speech
    console.log('Starting speech generation');
    const speechResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: voiceId || 'nova',
      input: story,
      speed: 0.9,
      response_format: "mp3",
    });

    // 2. Save audio file
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const audioFileName = `audio_${Date.now()}.mp3`;
    const audioPath = path.join(tempDir, audioFileName);
    
    const audioData = await speechResponse.arrayBuffer();
    fs.writeFileSync(audioPath, Buffer.from(audioData));

    // 3. Get word timings
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"]
    });

    // 4. Generate subtitles file
    const subtitlesPath = path.join(tempDir, `subs_${Date.now()}.srt`);
    let srtContent = '';
    let index = 1;

    transcription.words?.forEach((word, i) => {
      const startTime = formatTime(word.start || 0);
      const endTime = formatTime(word.end || 0);
      
      srtContent += `${index}\n`;
      srtContent += `${startTime} --> ${endTime}\n`;
      srtContent += `${word.word}\n\n`;
      
      index++;
    });

    fs.writeFileSync(subtitlesPath, srtContent);

    // 5. Process video
    const videoFileName = `video_${Date.now()}.mp4`;
    const outputPath = path.join(tempDir, videoFileName);
    const inputVideoPath = path.join(process.cwd(), 'public', backgroundVideo);

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(inputVideoPath)
        .input(audioPath)
        .complexFilter([
          {
            filter: 'subtitles',
            options: {
              filename: path.resolve(subtitlesPath),
              force_style: `FontName=${fontStyle},FontSize=24,Alignment=10,BorderStyle=3,Outline=1,Shadow=0,MarginV=25,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&`
            },
            inputs: '[0:v]',
            outputs: '[v]'
          }
        ])
        .outputOptions([
          '-map', '[v]',          // map the video with subtitles
          '-map', '1:a',          // map only the AI generated audio
          '-c:v', 'libx264',      // video codec
          '-preset', 'medium',
          '-crf', '23',
          '-c:a', 'aac',          // audio codec
          '-b:a', '192k',
          '-shortest'             // match shortest input length
        ])
        .on('start', (commandLine) => {
          console.log('Started processing video');
          console.log('FFmpeg command:', commandLine);
        })
        .on('progress', (progress) => {
          console.log(`Processing: ${progress.percent}% done`);
        })
        .on('end', () => {
          console.log('Video processing completed');
          resolve(true);
        })
        .on('error', (err, stdout, stderr) => {
          console.error('Error:', err);
          console.error('FFmpeg stderr:', stderr);
          reject(err);
        })
        .save(outputPath);
    });

    // 6. Clean up temporary files
    cleanupOldFiles(tempDir);

    // 7. Return the URLs
    return NextResponse.json({ 
      success: true,
      videoUrl: `/temp/${videoFileName}`,
      subtitles: transcription.words
    });

  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// Helper functions remain the same
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

function cleanupOldFiles(directory: string) {
  const files = fs.readdirSync(directory);
  const now = Date.now();
  const oneHourAgo = now - (60 * 60 * 1000);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.ctimeMs < oneHourAgo) {
      fs.unlinkSync(filePath);
    }
  });
} 