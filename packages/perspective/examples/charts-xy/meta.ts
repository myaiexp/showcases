// Perspective example: the X/Y chart family
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'X/Y Scatter, X/Y Line and Density',
  summary: 'Here both axes come from columns rather than group_by: X/Y Scatter adds colour and size columns, X/Y Line connects rows in sort order, and Density splats thousands of points into a heat field.',
  section: 'Charts',
  tags: ['X/Y Scatter', 'X/Y Line', 'Density', 'WebGL', 'columns', 'split_by'],
  docs: ['repo/packages/viewer-charts/README.md', 'repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
