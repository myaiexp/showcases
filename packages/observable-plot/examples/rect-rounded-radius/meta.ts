// observable-plot example: Rect: rounded corners with r
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: rounded corners with r',
  summary:
    'The r option rounds every corner of a histogram bar; when the radii exceed the rect the corners shrink into a pill shape. Drag the slider to see it.',
  section: 'Mark: Rect',
  tags: ['rectY', 'binX', 'r', 'thresholds'],
  docs: ['repo/docs/marks/rect.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
