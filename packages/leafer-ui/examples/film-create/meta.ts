// leafer-ui example: Film: an animated GIF element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: an animated GIF element",
  summary:
    "A Film element plays an animated GIF on the canvas; click it to toggle play and pause with togglePlay(). The GIF is encoded in code and handed over as a blob URL.",
  section: 'Official plugins',
  tags: ["Film", "url", "togglePlay"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
