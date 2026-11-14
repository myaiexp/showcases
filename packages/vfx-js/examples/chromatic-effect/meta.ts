// VFX-JS example: ChromaticEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ChromaticEffect',
  summary:
    'Chromatic aberration on a test card: red, green and blue fringes split apart toward the edges of the picture. intensity, radius (where the effect starts) and power (how fast it grows) are read every frame.',
  section: '@vfx-js/effects',
  tags: ['ChromaticEffect', 'effect', 'intensity', 'radius', 'power', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/chromatic.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
