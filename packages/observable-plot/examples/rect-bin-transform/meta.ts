// observable-plot example: Rect: the bin transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: the bin transform',
  summary:
    'Plot.binX bins raw random values for rectY, and adds a 1px inset so adjacent rects stay distinct. The sample size changes how many bins Plot picks.',
  section: 'Mark: Rect',
  tags: ['rectY', 'binX', 'inset'],
  docs: ['repo/docs/marks/rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
