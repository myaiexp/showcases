// observable-plot example: Area: gaps versus filtering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: gaps versus filtering',
  summary:
    'NaN values break the area into segments with gaps; filtering the rows out instead interpolates straight across. Switch between the two.',
  section: 'Mark: Area',
  tags: ['areaY', 'lineY', 'filter', 'NaN'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
