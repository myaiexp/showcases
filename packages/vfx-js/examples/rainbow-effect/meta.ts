// VFX-JS example: RainbowEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RainbowEffect',
  summary:
    'A moving diagonal rainbow laid over a landscape. RainbowEffect has two params, speed (how fast the hue sweeps) and frequency (how many bands fit across the picture).',
  section: '@vfx-js/effects',
  tags: ['RainbowEffect', 'effect', 'speed', 'frequency', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/rainbow.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
