// galacean example: XR: a hit-test reticle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: a hit-test reticle",
  summary:
    "A ring follows the pointer over the floor. Where WebXR plane tracking exists the position would come from XRHitTest.screenHitTest(x, y, TrackableType.Plane); here no feature is available, so the same spot is found with a physics raycast on a stand-in floor, and the panel says which path ran.",
  section: "XR",
  tags: ['XRHitTest.screenHitTest', 'TrackableType', 'PhysicsScene.raycast', 'Camera.screenPointToRay'],
  docs: [
    'repo/docs/en/xr/system/features.mdx',
    'repo/docs/en/xr/system/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
