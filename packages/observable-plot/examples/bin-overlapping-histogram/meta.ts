// observable-plot example: Bin: overlapping histograms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: overlapping histograms',
  summary:
    'Outputting y2 instead of y opts out of the implicit stack, so the sexes overlap from zero; mixBlendMode keeps the overlap visible. Toggle to stack them.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'y2', 'mixBlendMode', 'fill'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
