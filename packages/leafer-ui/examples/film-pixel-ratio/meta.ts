// leafer-ui example: Film: pixelRatio sets the natural size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: pixelRatio sets the natural size",
  summary:
    "A Film with no width or height uses the GIF's own size divided by pixelRatio: 1, 2 and 3 give 96, 48 and 32 px for the same 96 px GIF.",
  section: 'Official plugins',
  tags: ["Film", "pixelRatio"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
