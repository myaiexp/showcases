// a canvas-wide spotlight effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A spotlight over the whole canvas',
  summary:
    'The effect returns dims.canvasRect from outputRect, so it draws over the whole canvas instead of the picture\'s box. It reads ctx.mouseViewport, the pointer in canvas pixels, and lights a round glow there, even where there is no element. The canvas is clipped to this stage.',
  section: 'Custom Effects',
  tags: ['outputRect', 'dims.canvasRect', 'ctx.mouseViewport', 'ctx.resolution', 'ctx.pixelRatio', 'srcRectUv'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md', 'repo/packages/effects/src/_pad.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
