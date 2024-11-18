import { WordTiming, Subtitle } from '@/types';

export function generateSubtitles(wordTimings: WordTiming[]): Subtitle[] {
  const subtitles: Subtitle[] = [];
  let currentGroup: WordTiming[] = [];
  
  wordTimings.forEach((timing, index) => {
    currentGroup.push(timing);

    // Create a new subtitle group every 3-4 words or at the end
    if (currentGroup.length >= 4 || index === wordTimings.length - 1) {
      const words = currentGroup.map(t => t.word);
      
      subtitles.push({
        id: `subtitle-${subtitles.length}`,
        text: words.join(' '),
        startTime: currentGroup[0].start,
        endTime: currentGroup[currentGroup.length - 1].end
      });

      currentGroup = [];
    }
  });

  return subtitles;
} 