// aframe example: raycaster: near, far, interval and enabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "raycaster: near, far, interval and enabled",
  summary: "A ray with showLine crosses a row of spheres at growing distances. near and far clip which ones count, interval spaces out the intersection tests (the hit state updates only that often), and enabled switches the raycaster off. Sliders set each property on the raycaster component.",
  section: 'Components',
  tags: ["raycaster", "near", "far", "interval", "enabled", "showLine", "lineColor", "lineOpacity"],
  docs: ["repo/docs/components/raycaster.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
