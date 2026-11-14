// observable-plot example: Rect: rect and rectX constructors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: rect and rectX constructors',
  summary:
    'Plot.rect with bin on x and y makes a weight-by-height heatmap; Plot.rectX with binY makes a horizontal histogram stacked from x = 0.',
  section: 'Mark: Rect',
  tags: ['rect', 'rectX', 'bin', 'binY'],
  docs: ['repo/docs/marks/rect.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
