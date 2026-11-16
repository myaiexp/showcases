// leafer-ui example: Film: seekFrame jumps to a frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: seekFrame jumps to a frame",
  summary:
    "seekFrame(index) shows one chosen frame; the slider runs from 0 to decoder.total - 1 (the number painted in the GIF is the frame number).",
  section: 'Official plugins',
  tags: ["Film", "seekFrame", "decoder", "total"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
