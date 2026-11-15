// css-doodle example: Doodle size in pixels: @uw and @uh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Doodle size in pixels: @uw and @uh',
  summary:
    '@uw and @uh are the width and height of the doodle in pixels, kept up to date as it resizes. Here they turn each cell position into pixel coordinates so atan2() gives the angle from the center, and the squares re-aim as the doodle changes shape.',
  section: 'Cell functions',
  tags: ['@uw', '@uh', '@x', '@y', 'atan2', 'resize'],
  docs: [
    'pages/css-doodle-com/reference/function-uw.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
