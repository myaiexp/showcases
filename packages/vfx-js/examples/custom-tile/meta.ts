// the docs' TileEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The docs' TileEffect",
  summary:
    'An 8x4 canvas of random colours tints the picture, one tile per colour. The canvas is wrapped with autoUpdate off and filter nearest, so it uploads to the GPU only when shuffle() paints it and calls texture.update(). Click the picture to shuffle.',
  section: 'Custom Effects',
  tags: ['wrapTexture', 'autoUpdate', 'texture.update', 'filter nearest', 'EffectTexture', 'dispose'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
