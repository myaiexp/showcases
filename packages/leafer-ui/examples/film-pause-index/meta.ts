// leafer-ui example: Film: playerOptions pauseIndex stops on a frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Film: playerOptions pauseIndex stops on a frame",
  summary:
    "Set playerOptions.pauseIndex and call play(): the film runs on and pauses itself when it reaches that frame.",
  section: 'Official plugins',
  tags: ["Film", "playerOptions", "pauseIndex", "nowIndex", "play"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/film.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/film/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
