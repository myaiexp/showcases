// observable-plot example: Bin: insets and rounding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: insets and rounding',
  summary:
    'The bin transform leaves a one pixel gap between rects by default. Setting inset to 0 makes them touch, and rounding the x scale avoids anti-aliasing seams between them.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'inset', 'round'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
