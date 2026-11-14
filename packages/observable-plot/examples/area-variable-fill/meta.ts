// observable-plot example: Area: varying fill in one series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: varying fill in one series',
  summary:
    'z: null keeps a single series while fill varies along it, here by trading volume on a log colour scale.',
  section: 'Mark: Area',
  tags: ['areaY', 'fill', 'z'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
