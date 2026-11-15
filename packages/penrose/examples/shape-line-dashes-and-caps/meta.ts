// penrose example: Line dashes and linecaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line dashes and linecaps',
  summary:
    'A Line takes the stroke properties of the other shapes plus `strokeLinecap`. The tabs give a dashed line, a long-short dash pattern, and `"1 12"` dots with `strokeLinecap : "round"`, which turns each zero-length dash into a round dot.',
  section: 'Shape: Line',
  tags: ['Line', 'strokeDasharray', 'strokeLinecap', 'strokeStyle'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/line.md', 'repo/packages/core/src/shapes/Line.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
