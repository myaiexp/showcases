// 3d-force-graph example: Render control: cameraPosition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: cameraPosition",
  summary:
    "cameraPosition({x, y, z}, lookAt, ms) moves the camera to a point, aims it at another and tweens both over ms milliseconds. The buttons fly between front, top, side and diagonal views and in beside a node.",
  section: "Render control",
  tags: ['cameraPosition', 'onEngineStop'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
