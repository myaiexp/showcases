// leafer-ui example: Video: Resource.loadVideo preloads before adding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video: Resource.loadVideo preloads before adding",
  summary:
    "Resource.loadVideo(url) resolves once the video has metadata and a first frame; the Video is created afterwards and reuses that resource.",
  section: 'Official plugins',
  tags: ["Resource.loadVideo", "Video", "url", "pixelRatio"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/video.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/video/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
