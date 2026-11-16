// leafer-ui example: Video: play, pause, stop and togglePlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video: play, pause, stop and togglePlay",
  summary:
    "The player methods of a Video: play() and pause(), stop() which rewinds to 0 and pauses, and togglePlay(). The readout shows the paused, ended and currentTime properties.",
  section: 'Official plugins',
  tags: ["Video", "play", "pause", "stop", "togglePlay", "paused", "ended"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/video.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/video/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
