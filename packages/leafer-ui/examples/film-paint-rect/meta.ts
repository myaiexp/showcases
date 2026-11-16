// leafer-ui example: Film: PaintFilm plays a GIF inside a Rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: PaintFilm plays a GIF inside a Rect",
  summary:
    "Any element with a film fill can play a GIF. PaintFilm(rect) pulls the player out of the Rect so togglePlay(), play(), pause() and stop() work on it.",
  section: 'Official plugins',
  tags: ["PaintFilm", "Rect", "fill", "togglePlay"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
