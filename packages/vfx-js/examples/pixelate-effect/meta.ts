// VFX-JS example: PixelateEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PixelateEffect',
  summary:
    'A portrait in square blocks. PixelateEffect\'s one param, size, is the block edge in CSS pixels and is read every frame, so it can be swept or dragged.',
  section: '@vfx-js/effects',
  tags: ['PixelateEffect', 'effect', 'size', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pixelate.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
