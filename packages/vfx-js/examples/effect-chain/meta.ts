// VFX-JS example: Chaining effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chaining effects',
  summary:
    'The docs\' chain on a playing video: PixelateEffect, then ScanlineEffect, then BloomEffect, passed as an array to the effect option. Each effect reads the output of the one before it. The bloom has its own pad because overflow does not apply to effects.',
  section: '@vfx-js/effects',
  tags: ['effect', 'array', 'chain', 'PixelateEffect', 'ScanlineEffect', 'BloomEffect', 'pad', 'video'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pixelate.ts',
    'repo/packages/effects/src/scanline.ts',
    'repo/packages/effects/src/bloom.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
