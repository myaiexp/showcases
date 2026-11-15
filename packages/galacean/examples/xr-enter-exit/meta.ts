// galacean example: XR: an Enter AR / Enter VR button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: an Enter AR / Enter VR button",
  summary:
    "The docs' button recipe: Enter AR and Enter VR call xrManager.enterXR, and when the browser cannot start a session the button says why instead of failing silently. A state listener prints XRSessionState. Cards only show the room and the state.",
  section: "XR",
  tags: ['XRManager.enterXR', 'XRManager.exitXR', 'XRSessionManager.addStateChangedListener', 'XRSessionState'],
  docs: [
    'repo/docs/en/xr/quickStart/develop.mdx',
    'repo/docs/en/xr/system/session.mdx',
    'repo/docs/en/xr/system/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
