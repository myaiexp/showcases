// observable-plot example: Rect: rectY over d3.bin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: rectY over d3.bin',
  summary:
    'A histogram from bins computed by d3.bin: the bin bounds x0 and x1 map to the rect options x1 and x2, and the length field is y. The slider changes the thresholds.',
  section: 'Mark: Rect',
  tags: ['rectY', 'x1', 'x2', 'd3.bin', 'round'],
  docs: ['repo/docs/marks/rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
