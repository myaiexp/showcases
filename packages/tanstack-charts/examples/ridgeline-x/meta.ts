// tanstack-charts example: Vertical ridges with ridgelineX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vertical ridges with ridgelineX',
  summary:
    'ridgelineX transposes the mark: categories sit on x and each profile extends to the right of its baseline while the profile position runs along y. The profiles come from binY on the same observations.',
  section: 'Ridgeline Marks',
  tags: ['ridgelineX', 'binY', 'scalePoint'],
  docs: ['repo/docs/reference/marks/ridgeline.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
