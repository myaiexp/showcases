// observable-plot example: Area: interval and reduce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: interval and reduce',
  summary:
    'With interval: day areaY bins rows into days. The reduce option decides whether days with no row show as gaps (first) or as zero (sum).',
  section: 'Mark: Area',
  tags: ['areaY', 'interval', 'reduce'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
