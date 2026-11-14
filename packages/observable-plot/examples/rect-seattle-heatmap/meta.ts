// observable-plot example: Rect: interval heatmap of Seattle weather
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: interval heatmap of Seattle weather',
  summary:
    'Day-of-month against month for 2015, where interval: 1 expands each number to a unit rect. The select picks which weather column fills the cells.',
  section: 'Mark: Rect',
  tags: ['rect', 'interval', 'inset', 'formatMonth', 'fill'],
  docs: ['repo/docs/marks/rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
