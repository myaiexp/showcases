// l7 example: Earth atmosphere layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth atmosphere layer',
  summary:
    'An EarthLayer with shape(\'atomSphere\') draws the thin glow around the planet. It needs no source; color and opacity set its tint and strength.',
  section: 'Experiment',
  tags: ['EarthLayer', 'shape(\'atomSphere\')', 'color', 'opacity'],
  docs: [
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
