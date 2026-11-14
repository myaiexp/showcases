// VFX-JS example: HalftoneEffect CMYK inks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'HalftoneEffect CMYK inks',
  summary:
    'A poster printed in four inks on cream paper. In cmyk mode HalftoneEffect separates the picture into cyan, magenta, yellow and black dot screens; setInkPreset switches the ink colours (pure, newsprint, fogra51, swop) and blackAmount sets how much black is used.',
  section: '@vfx-js/effects',
  tags: ['HalftoneEffect', 'cmyk', 'setInkPreset', 'HALFTONE_INK_PRESETS', 'blackAmount', 'background'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/halftone.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
