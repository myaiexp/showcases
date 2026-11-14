// VFX-JS example: RgbShiftEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RgbShiftEffect',
  summary:
    'A poster with its red, green and blue channels pulled apart sideways. RgbShiftEffect\'s amount is the largest horizontal shift in CSS px and speed is the time scale; both are read every frame.',
  section: '@vfx-js/effects',
  tags: ['RgbShiftEffect', 'effect', 'speed', 'amount', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/rgb-shift.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
