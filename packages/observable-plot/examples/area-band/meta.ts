// observable-plot example: Area: temperature band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: temperature band',
  summary:
    'A band between daily low and high temperatures using y1 and y2. A slider smooths the spiky band with the windowY transform.',
  section: 'Mark: Area',
  tags: ['areaY', 'y1', 'y2', 'windowY'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/sf-temperatures.ts', 'repo/docs/transforms/window.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
