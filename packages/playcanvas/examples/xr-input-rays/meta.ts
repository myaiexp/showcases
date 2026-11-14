// playcanvas example: Input source rays and select
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Input source rays and select',
  summary:
    "Every XR input source has a ray, an origin and a direction in world space, and a primary action called select. Two simulated controllers point rays at a row of boxes; each ray is fed to aabb.intersectsRay and the nearest box takes the hit. Move the mouse to aim the right controller and click to select, which lights the box. In a real session the same picking code runs on app.xr.input sources, added and removed through the add and remove events, with a grip box that follows each controller.",
  section: 'XR',
  tags: ['XrInput', 'XrInputSource', 'getOrigin', 'getDirection', 'select', 'selectstart', 'intersectsRay', 'grip'],
  docs: ['repo/docs/user-manual/xr/input-sources.md', 'repo/docs/user-manual/xr/using-webxr.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
