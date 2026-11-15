// galacean example: XR: attachCamera, detachCamera, fixedFoveation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: attachCamera, detachCamera, fixedFoveation",
  summary:
    "A spare camera is attached to XRTrackedInputDevice.Camera and detached again from buttons (AR binds one camera, VR binds LeftCamera and RightCamera). Reading fixedFoveation before a session exists throws, and the panel shows the message.",
  section: "XR",
  tags: ['XRCameraManager.attachCamera', 'XRCameraManager.detachCamera', 'XRCameraManager.fixedFoveation', 'XRTrackedInputDevice'],
  docs: [
    'repo/docs/en/xr/system/camera.mdx',
    'repo/docs/en/xr/system/session.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
