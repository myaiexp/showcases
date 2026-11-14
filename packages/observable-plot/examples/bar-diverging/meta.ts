// observable-plot example: Bar: diverging population change
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: diverging population change',
  summary:
    'State population change from 2010 to 2019 as bars either side of zero, colored by sign with an ordinal PiYG scheme and a percent x scale.',
  section: 'Mark: Bar',
  tags: ['barX', 'percent', 'gridX', 'axisY', 'sort', 'scheme'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/us-state-population-2010-2019.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
