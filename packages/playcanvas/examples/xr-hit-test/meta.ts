// playcanvas example: Hit test reticle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hit test reticle',
  summary:
    "AR hit testing probes real-world geometry with a ray and returns a position and rotation, the basis of placing an object so it looks planted. Here a simulated ray from the mouse probes a floor and a table top, a reticle sits on the hit and a click places a cone, with the same place() the real path uses. In an AR session on a phone or headset, app.xr.hitTest.start from the viewer space feeds the reticle through the result event and select places the cone.",
  section: 'XR',
  tags: ['XrHitTest', 'hitTest.start', 'XRSPACE_VIEWER', 'result', 'select', 'XRTYPE_AR'],
  docs: ['repo/docs/user-manual/xr/ar/hit-testing.md', 'repo/docs/user-manual/xr/ar/index.md', 'repo/docs/user-manual/xr/input-sources.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
