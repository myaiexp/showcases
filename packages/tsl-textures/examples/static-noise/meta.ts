// tsl-textures example: Static noise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Static noise',
  summary:
    'staticNoise() mapped by screenCoordinate and the TSL time node, so the grain stays fixed to the screen while the model turns and re-rolls over time (delay 0 is every frame, 1 is once a second). The docs call it an extra layer, so it multiplies a base colour here.',
  section: 'Textures',
  tags: ['staticNoise', 'colorNode', 'screenCoordinate', 'time', 'delay'],
  docs: ['repo/docs/static-noise.md', 'repo/src/static-noise.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
