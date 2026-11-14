// VFX-JS example: SinewaveEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SinewaveEffect',
  summary:
    'A landscape that ripples sideways along a travelling sine wave. SinewaveEffect takes amount (the wave\'s height in CSS px), frequency (waves down the picture), speed and a horizontal blur.',
  section: '@vfx-js/effects',
  tags: ['SinewaveEffect', 'effect', 'speed', 'amount', 'frequency', 'blur', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/sinewave.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
