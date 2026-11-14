// motion example: Scroll-driven 3D logo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scroll-driven 3D logo",
  summary: "Scroll the panel and a 3D logo turns and fades in step with it. One scroll progress value feeds the rotation and the opacity, bound to Three.js with threeEffect.",
  section: "Integrations",
  tags: ["threeEffect","scroll","transformValue","motionValue","frame.render"],
  docs: ["pages/motion-dev/docs/three.md","pages/motion-dev/docs/scroll.md","pages/motion-dev/docs/motion-value.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
