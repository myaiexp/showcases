// VFX-JS example: vfx.updateEffects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'vfx.updateEffects',
  summary:
    'Swap an element\'s effect chain without removing it. updateEffects(element, list) starts the new instances, disposes the ones that left and leaves the rest running, so a DatamoshEffect that stays in the list keeps its smear while others are switched on and off around it.',
  section: '@vfx-js/effects',
  tags: ['updateEffects', 'effect', 'chain', 'DatamoshEffect', 'PixelateEffect', 'ScanlineEffect', 'BloomEffect'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/datamosh.ts',
    'repo/packages/effects/src/pixelate.ts',
    'repo/packages/effects/src/scanline.ts',
    'repo/packages/effects/src/bloom.ts',
    'repo/packages/vfx-js/README.md',
    'repo/skills/vfx-js/references/effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
