// Spark example: point lights from sphere SDFs on a darkened splat garden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit point lights',
  summary:
    'A garden at night: a MULTIPLY edit with an ALL shape dims every splat, then four coloured sphere SDFs, each in its own ADD_RGBA edit with opacity 0, orbit as point lights whose glows add up where they overlap. Sliders set the light radius, softEdge and brightness, and a checkbox switches the night on and off.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'ADD_RGBA', 'MULTIPLY', 'ALL', 'SPHERE', 'softEdge'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
