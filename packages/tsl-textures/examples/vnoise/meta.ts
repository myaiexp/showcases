// tsl-textures example: vnoise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'vnoise',
  summary:
    'vnoise() hashes a vec3 into a value in [-1, 1] with no smoothing. Flooring the position gives one random value per cell, shown grey and as colour, next to the raw hash on an unfloored position.',
  section: 'Utilities',
  tags: ['vnoise', 'floor', 'hash', 'cells'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
