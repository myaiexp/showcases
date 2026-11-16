// aframe example: raycaster: raycaster-intersected and closest-entity events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "raycaster: raycaster-intersected and closest-entity events",
  summary: "Events also fire on the entities being hit. A spinning ray passes over three boxes; each box reports raycaster-intersected (detail.el is the raycaster) and raycaster-intersected-cleared, and the raycaster entity reports raycaster-closest-entity-changed as the nearest hit changes. The boxes light up while hit.",
  section: 'Components',
  tags: ["raycaster", "raycaster-intersected", "raycaster-intersected-cleared", "raycaster-closest-entity-changed", "detail.el"],
  docs: ["repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
