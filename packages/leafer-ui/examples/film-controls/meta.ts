// leafer-ui example: Film: play, pause, stop and togglePlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: play, pause, stop and togglePlay",
  summary:
    "The four player methods of a Film: play() and pause() switch playback, stop() pauses and rewinds to the first frame, togglePlay() flips between them.",
  section: 'Official plugins',
  tags: ["Film", "play", "pause", "stop", "togglePlay"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
