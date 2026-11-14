// playcanvas example: Starting a WebXR session
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Starting a WebXR session',
  summary:
    "The code path every XR app begins with: check app.xr.supported, ask app.xr.isAvailable for VR and AR, follow the available event, and call camera.startXr(type, space) from a click. The Enter buttons appear only for session types that are available; a browser without a headset gets a notice instead of an error. The camera sits under a rig entity because a session overwrites its pose, and the clear colour turns transparent for AR. Until a session starts, a simulated viewer orbits the play area.",
  section: 'XR',
  tags: ['XrManager', 'supported', 'isAvailable', 'startXr', 'XRTYPE_VR', 'XRTYPE_AR', 'XRSPACE_LOCALFLOOR'],
  docs: ['repo/docs/user-manual/xr/index.md', 'repo/docs/user-manual/xr/using-webxr.md', 'repo/docs/user-manual/xr/vr/index.md', 'repo/docs/user-manual/xr/ar/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
