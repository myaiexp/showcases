// galacean example: XR: the session state walk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: the session state walk",
  summary:
    "A walk through the five XRSessionState values the docs chart: None, Initializing, Initialized, Running and Paused. A cube per state lights in turn with its enum number, next to the live sessionManager.state, which stays None because no session starts here.",
  section: "XR",
  tags: ['XRSessionState', 'XRSessionManager.state', 'XRSessionManager.mode'],
  docs: [
    'repo/docs/en/xr/system/session.mdx',
    'repo/docs/en/xr/system/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
