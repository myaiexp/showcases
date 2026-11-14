// observable-plot example: Area: curve interpolation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: curve interpolation',
  summary:
    'The curve option controls interpolation between points: linear, step variants, basis, cardinal and others, on a short temperature band.',
  section: 'Mark: Area',
  tags: ['areaY', 'curve', 'line'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/sf-temperatures.ts', 'repo/docs/features/curves.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
