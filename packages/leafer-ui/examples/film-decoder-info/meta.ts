// leafer-ui example: Film: decoder width, height, total and frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: decoder width, height, total and frames",
  summary:
    "Once the GIF has loaded, film.decoder describes it: its size, the number of frames, the loop count and each frame's duration. The readout is taken from that object.",
  section: 'Official plugins',
  tags: ["Film", "decoder", "IFilmDecoder", "ready", "ImageEvent.LOADED"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
