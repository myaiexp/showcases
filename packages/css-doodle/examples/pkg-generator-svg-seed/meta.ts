// svg(): a fixed seed repeats the random values, no seed picks new ones each call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'svg() with and without a seed',
  summary:
    'Three calls to svg.element() with the same @svg code of twelve random rectangles, repeated every 1.5 seconds. The two with { seed: 42 } never change and always match; the one without a seed picks new values on every call.',
  section: 'Package exports',
  tags: ['svg()', 'svg.element()', 'seed', 'css-doodle/generator'],
  docs: ['pages/css-doodle-com/reference/js-api-svg.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
