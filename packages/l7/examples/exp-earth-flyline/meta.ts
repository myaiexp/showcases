// l7 example: Earth mode: fly lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth mode: fly lines',
  summary:
    'A LineLayer with shape(\'arc3d\') draws great-circle flight arcs that lift off the globe. It is the only line shape the Earth mode supports; animate adds a streak that flies along each arc.',
  section: 'Experiment',
  tags: ['Earth', 'LineLayer', 'shape(\'arc3d\')', 'EarthLayer', 'animate'],
  docs: [
    'repo/site/docs/api/experiment/flyline.en.md',
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
