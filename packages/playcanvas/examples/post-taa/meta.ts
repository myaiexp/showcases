// playcanvas example: CameraFrame temporal anti-aliasing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame temporal anti-aliasing',
  summary:
    'TAA jitters the camera a sub-pixel each frame and blends the history, smoothing edges without multisampling; with MSAA off the card flips it on and off over thin capsules and box edges. The full view sets taa.jitter, counters the softness with rendering.sharpness and can add MSAA samples on top.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'taa.enabled', 'taa.jitter', 'rendering.sharpness', 'rendering.samples'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
