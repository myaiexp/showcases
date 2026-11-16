// leafer-ui example: Video: a video element on the canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video: a video element on the canvas",
  summary:
    "A Video element decodes a video file into the canvas; click it to pause or play with togglePlay(). The clip is recorded from a canvas with MediaRecorder when the example opens.",
  section: 'Official plugins',
  tags: ["Video", "url", "togglePlay", "pixelRatio"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/video.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/video/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
