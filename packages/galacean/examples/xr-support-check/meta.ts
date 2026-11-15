// galacean example: XR: what this browser supports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: what this browser supports",
  summary:
    "The engine is created with the WebXR device and asks, without starting anything, whether AR and VR sessions are possible and whether plane, anchor, image and hit-test features exist, listing each answer or the reason it was refused. Most desktop browsers answer no.",
  section: "XR",
  tags: ['XRSessionManager.isSupportedMode', 'XRManager.isSupportedFeature', 'XRSessionMode', 'WebXRDevice'],
  docs: [
    'repo/docs/en/xr/compatibility.mdx',
    'repo/docs/en/xr/system/session.mdx',
    'repo/docs/en/xr/system/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
