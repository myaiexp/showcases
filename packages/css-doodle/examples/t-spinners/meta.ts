// css-doodle example: Time units: @t, @ts and $deg
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time units: @t, @ts and $deg',
  summary:
    'Four needles spin from the same clock in different units: @t(*.1deg) turns by milliseconds, @ts(*90deg) by seconds, @t(%360deg) wraps with mod(), and $deg(@t / 10) writes the math out as CSS calc().',
  section: 'Cell functions',
  tags: ['@t', '@ts', '$deg', 'rotate', 'animation'],
  docs: [
    'pages/css-doodle-com/reference/function-t.md',
    'pages/css-doodle-com/reference/function-dollar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
