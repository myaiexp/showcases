// currentTime: read or set the time of all of the doodle's animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scrubbing with currentTime',
  summary:
    'A pulse wave spreading from the centre, paused. Setting doodle.currentTime moves every animation in the doodle to that moment together, so a slider scrubs through it like a video; the card steps frames of 1000 / 60 ms forward and back.',
  section: 'Element API',
  tags: ['currentTime', 'pause()', '@dr', '@keyframes'],
  docs: ['pages/css-doodle-com/reference/js-api-current-time.md', 'pages/css-doodle-com/reference/js-api-pause.md', 'pages/css-doodle-com/reference/function-dx.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
