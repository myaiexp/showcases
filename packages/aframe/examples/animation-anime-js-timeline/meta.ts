// aframe example: animation: AFRAME.ANIME for a timeline the component does not offer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: AFRAME.ANIME for a timeline the component does not offer",
  summary: "The docs point to AFRAME.ANIME for what the component skips, such as timelines. A component calls anime.timeline() on a sphere's object3D position so it walks a path in steps, each with its own easing, and loops.",
  section: 'Components',
  tags: ["AFRAME.ANIME", "anime.timeline", "registerComponent", "object3D.position"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
