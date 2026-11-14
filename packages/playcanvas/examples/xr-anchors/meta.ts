// playcanvas example: Anchors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Anchors',
  summary:
    "An anchor is a point in space whose pose the AR system keeps updating as it learns the room, so objects placed on it stay planted. Each simulated anchor drifts as the system refines it and fires change; a blue cone follows it through the docs' add and change handlers while a grey ghost stays where the object was first dropped, with a line showing the correction. Click the floor to create more. In an AR session started with anchors: true, app.xr.anchors.create feeds the very same handler.",
  section: 'XR',
  tags: ['XrAnchors', 'XrAnchor', 'anchors.create', 'add', 'change', 'persistence', 'anchors: true'],
  docs: ['repo/docs/user-manual/xr/ar/anchors.md', 'repo/docs/user-manual/xr/ar/hit-testing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
