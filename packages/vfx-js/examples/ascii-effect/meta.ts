// VFX-JS example: AsciiEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AsciiEffect',
  summary:
    'A portrait rebuilt out of text characters: AsciiEffect cuts the picture into grid cells and draws one glyph per cell, picked from a dark-to-light ramp by the cell\'s brightness. grid, colorFromSource, invert and dither are read every frame, so the sliders change them in place.',
  section: '@vfx-js/effects',
  tags: ['AsciiEffect', 'effect', 'grid', 'colorFromSource', 'invert', 'dither', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/ascii.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
