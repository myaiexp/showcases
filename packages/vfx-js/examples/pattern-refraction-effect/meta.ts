// VFX-JS example: PatternRefractionEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PatternRefractionEffect',
  summary:
    'A landscape seen through ribbed glass: PatternRefractionEffect bends each strip of the picture like a lens. strength, stripWidth, smoothness, frost (jitter), dispersion (colour split) and the rotation angle are read every frame.',
  section: '@vfx-js/effects',
  tags: ['PatternRefractionEffect', 'effect', 'strength', 'stripWidth', 'smoothness', 'frost', 'dispersion', 'angle', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pattern-refraction.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
