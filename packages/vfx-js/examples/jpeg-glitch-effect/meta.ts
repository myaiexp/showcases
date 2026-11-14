// VFX-JS example: JPEGGlitchEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JPEGGlitchEffect',
  summary:
    'Real JPEG damage: JPEGGlitchEffect reads the picture back, encodes it as a JPEG, overwrites bytes in the scan data and draws what the browser\'s decoder makes of it. speed 0 holds one frame; changing params goes through setParams so the frame is glitched again.',
  section: '@vfx-js/effects',
  tags: ['JPEGGlitchEffect', 'effect', 'setParams', 'quality', 'iterations', 'seed', 'resolutionScale', 'speed', 'vertical', 'bypass'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/jpeg-glitch.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
