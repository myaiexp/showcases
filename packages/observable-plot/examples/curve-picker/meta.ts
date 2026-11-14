// observable-plot example: Curves: every named curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curves: every named curve',
  summary:
    'A line and dots over twenty random values; the curve option switches between all twenty named curves, from basis splines to step functions.',
  section: 'Curves',
  tags: ['lineY', 'dotY', 'curve'],
  docs: ['repo/docs/features/curves.md', 'repo/docs/marks/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
