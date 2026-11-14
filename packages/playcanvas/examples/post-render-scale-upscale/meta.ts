// playcanvas example: Render scale and TAA upscaling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render scale and TAA upscaling',
  summary:
    'rendering.renderTargetScale draws the scene and its post-processing at a fraction of the canvas resolution and stretches it back with bilinear filtering; with TAA on, taa.upscale accumulates the jittered low-resolution frames at full resolution, and rendering.sharpness counters the softness. Four modes cycle on the card; the full view picks one and sets the scale.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'rendering.renderTargetScale', 'taa.upscale', 'rendering.sharpness'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
