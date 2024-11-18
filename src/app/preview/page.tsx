import VideoPreview from "@/components/Video-Components/VideoPreview";

export default function PreviewPage() {
  return (
    <VideoPreview
      videoUrl="your-generated-video-url"
      subtitles={[/* your subtitles array */]}
      fontStyle="your-selected-font"
    />
  );
} 