// VFX-JS example: VignetteEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'VignetteEffect',
  summary:
    'The edges of a portrait fall into shadow. VignetteEffect darkens from radius (measured from the centre) outward with a falloff curve power, scaled by intensity.',
  section: '@vfx-js/effects',
  tags: ['VignetteEffect', 'effect', 'intensity', 'radius', 'power', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/vignette.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
