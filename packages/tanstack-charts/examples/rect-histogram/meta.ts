// tanstack-charts example: Histogram from binX and rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Histogram from binX and rect',
  summary:
    'binX returns one row per bin with x1 and x2 edges. rect turns each into a bar by taking those edges as its x interval and a count as its height. The slider sets the threshold count, so the same data is re-binned into fewer or more bars.',
  section: 'Bar and Rect Marks',
  tags: ['rect', 'binX', 'x1', 'x2', 'thresholds'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
