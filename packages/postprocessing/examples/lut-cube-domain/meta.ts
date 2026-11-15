// postprocessing example: a .cube file's DOMAIN_MAX clipping the LUT's input range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT .cube input domain',
  summary:
    'A .cube file may declare DOMAIN_MIN and DOMAIN_MAX. LUTCubeLoader copies them into the texture, and LUT3DEffect then switches to a custom input domain: here an identity table with DOMAIN_MAX below 1, so every colour brighter than that clamps flat.',
  section: 'Color Grading',
  tags: ['LUTCubeLoader', 'domainMin', 'domainMax', 'DOMAIN_MAX', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/loaders/LUTCubeLoader.js', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
