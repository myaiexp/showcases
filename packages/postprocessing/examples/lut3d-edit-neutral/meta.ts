// postprocessing example: a neutral LookupTexture rewritten in code and used by LUT3DEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT3D: edit a neutral LUT',
  summary:
    'LookupTexture.createNeutral(16) is an identity 3D lookup table. The example overwrites its float data with a grade function (red varies fastest), marks it needsUpdate and LUT3DEffect applies it on the GPU with hardware interpolation.',
  section: 'Color Grading',
  tags: ['LUT3DEffect', 'LookupTexture', 'createNeutral', 'needsUpdate'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
