// galacean example: XR: origin and camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: origin and camera",
  summary:
    "The origin entity is the real-world floor point; the tracked headset pose is added to it, so the headset is at origin + pose. A simulated pose figure-eights around the origin and the sliders slide the origin: the readout is the sum, as in the docs' (1, 1, 1) + (x, y, z) note.",
  section: "XR",
  tags: ['XRManager.origin', 'Entity', 'XRCameraManager'],
  docs: [
    'repo/docs/en/xr/system/manager.mdx',
    'repo/docs/en/xr/system/camera.mdx',
    'repo/docs/en/xr/quickStart/develop.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
