// css-doodle example: Noise outlines with @R.t
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Noise outlines with @R.t",
  summary:
    "@R.t writes a noise curve that closes on itself, a different one in each cell, and the doodle's seed fixes it. Every redraw gives a new set of blobs.",
  section: 'Shapes',
  tags: ['@shape', '@R.t', 'r'],
  docs: ['pages/css-doodle-com/reference/function-shape.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
