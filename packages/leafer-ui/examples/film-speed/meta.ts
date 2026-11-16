// leafer-ui example: Film: playerOptions speed slows the playback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: playerOptions speed slows the playback",
  summary:
    "playerOptions is the live player state of a loaded Film. Its speed multiplies each frame duration: 1 plays at the GIF rate, 3 takes three times as long per frame.",
  section: 'Official plugins',
  tags: ["Film", "playerOptions", "speed"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
