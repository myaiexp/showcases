// tanstack-charts example: Interval band with y1 and y2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interval band with y1 and y2',
  summary:
    'Giving areaY y1 and y2 turns off stacking and fills exactly between the two authored boundaries. Here a forecast band is drawn from low to high values, with the middle estimate as a line on top.',
  section: 'Line and Area Marks',
  tags: ['areaY', 'y1', 'y2', 'lineY', 'layering'],
  docs: ['repo/docs/reference/marks/line-and-area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
