// aframe example: cursor: configure its raycaster, far, interval and objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cursor: configure its raycaster, far, interval and objects",
  summary: "The cursor builds on the raycaster component, so the raycaster property sets which entities it can click, how far it reaches and how often it tests. Only .clickable boxes respond here, and far: 6 leaves the distant box unreachable. A sweeping mouse in the card shows the difference.",
  section: 'Components',
  tags: ["cursor", "raycaster", "far", "interval", "objects", "clickable", "rayOrigin"],
  docs: ["repo/docs/components/cursor.md", "repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
