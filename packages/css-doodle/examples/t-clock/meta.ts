// css-doodle example: A clock from @TS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A clock from @TS',
  summary:
    '@T and @TS count milliseconds and seconds since midnight, so a doodle shows the time of day. The three hands rotate by @TS at 6deg a second, 0.1deg a second and 1/120deg a second.',
  section: 'Cell functions',
  tags: ['@T', '@TS', '@ts', '@pn', 'rotate', 'animation'],
  docs: [
    'pages/css-doodle-com/reference/function-t.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
