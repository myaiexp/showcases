// leafer-ui example: Video: currentTime and duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video: currentTime and duration",
  summary:
    "duration is the clip length in seconds and currentTime reads or sets the position; with the video paused, setting currentTime scrubs it, and the element redraws the new frame.",
  section: 'Official plugins',
  tags: ["Video", "currentTime", "duration", "PaintVideo"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/video.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/video/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
