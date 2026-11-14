// VFX-JS example: RgbGlitchEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RgbGlitchEffect',
  summary:
    'Blocks of a poster slide sideways with their red, green and blue channels split. RgbGlitchEffect takes speed (time scale) and amount (the block shift as a fraction of the width).',
  section: '@vfx-js/effects',
  tags: ['RgbGlitchEffect', 'effect', 'speed', 'amount', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/rgb-glitch.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
