// observable-plot example: Line: Tour de France elevation profile
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: Tour de France elevation profile',
  summary:
    'Elevation against distance for one 2017 stage. The x axis is distance, not time, and a ruleY at zero anchors the profile.',
  section: 'Mark: Line',
  tags: ['line', 'ruleY', 'label', 'grid'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/tdf.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
