// leafer-ui example: Video: ImageEvent.LOADED and canplaythrough
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video: ImageEvent.LOADED and canplaythrough",
  summary:
    "video.once(ImageEvent.LOADED) fires when the first frame is ready; the video element behind it (decoder.decoder) reports readyState, and canplaythrough means everything is buffered.",
  section: 'Official plugins',
  tags: ["Video", "ImageEvent.LOADED", "decoder", "readyState"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/video.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/video/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
