// playcanvas example: Reference spaces for VR
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reference spaces for VR',
  summary:
    "A reference space is the coordinate system a session reports poses in. A swaying simulated viewer shows where the origin of each XRSPACE constant sits: at head height for local, on the floor for local-floor, with a walkable boundary for bounded-floor, drifting for unbounded and glued to the head for viewer. The select picks the space an Enter VR button (shown only when VR is available) starts the session in.",
  section: 'XR',
  tags: ['XRSPACE_LOCAL', 'XRSPACE_LOCALFLOOR', 'XRSPACE_BOUNDEDFLOOR', 'XRSPACE_UNBOUNDED', 'XRSPACE_VIEWER', 'startXr'],
  docs: ['repo/docs/user-manual/xr/vr/types-of-vr.md', 'repo/docs/user-manual/xr/vr/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
