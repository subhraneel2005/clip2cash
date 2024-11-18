import { WordTiming } from '@/types';
import { generateSubtitles } from '@/utils/subtitleGenerator';
import { combineVideoWithSubtitles } from '@/utils/videoProcessor';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const STORYTELLING_VOICES = {
  MALE: {
    WARM: 'onyx',
    CLEAR: 'echo',
  },
  FEMALE: {
    WARM: 'nova',
    CLEAR: 'shimmer',
  }
} as const;

export async function POST(req: Request) {
  try {
    const { story, fontStyle, backgroundVideo } = await req.json();

    // Generate speech
    const speechResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: STORYTELLING_VOICES.FEMALE.WARM,
      input: story,
      speed: 0.9,
      response_format: "mp3",
    });

    // Get the audio data
    const audioData = await speechResponse.arrayBuffer();
    const audioBuffer = Buffer.from(audioData);

    // Save audio to temporary file for transcription
    const tempFilePath = `/tmp/temp_${Date.now()}.mp3`;
    await fs.promises.writeFile(tempFilePath, audioBuffer);

    // Create a File object from the temporary file
    const audioFile = await fetch(`file://${tempFilePath}`).then(res => res.blob());
    const file = new File([audioFile], 'audio.mp3', { type: 'audio/mp3' });

    // Get word timings using OpenAI's transcription
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    // Convert transcription segments to word timings
    const wordTimings: WordTiming[] = (transcription.words || []).map(word => ({
      word: word.word || '', // Using word instead of text
      start: word.start || 0,
      end: word.end || 0,
    }));

    // Save final audio
    const audioUrl = await saveAudioBuffer(audioBuffer);

    // Generate subtitles
    const subtitles = generateSubtitles(wordTimings);

    // Combine everything
    const finalVideo = await combineVideoWithSubtitles({
      backgroundVideo,
      voiceoverUrl: audioUrl,
      subtitles,
      fontStyle,
    });

    // Clean up temporary file
    await fs.promises.unlink(tempFilePath);

    return NextResponse.json({ 
      success: true,
      videoUrl: finalVideo,
      audioUrl
    });

  } catch (error) {
    console.error('Error generating video:', error);
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    );
  }
}

async function saveAudioBuffer(buffer: Buffer): Promise<string> {
  const fileName = `temp_${Date.now()}.mp3`;
  const filePath = `/tmp/${fileName}`;
  await fs.promises.writeFile(filePath, buffer);
  return filePath;
} 