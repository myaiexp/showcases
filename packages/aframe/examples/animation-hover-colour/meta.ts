// aframe example: animation: startEvents mouseenter and mouseleave tint a box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: startEvents mouseenter and mouseleave tint a box",
  summary: "Two animations on one entity listen for mouseenter and mouseleave, which a mouse cursor emits, and tween the three.js material colour directly with type: color. A third one answers a custom event, the way the docs build it.",
  section: 'Components',
  tags: ["animation", "startEvents", "mouseenter", "mouseleave", "cursor", "rayOrigin", "components.material.material.color", "type: color"],
  docs: ["repo/docs/components/animation.md", "repo/docs/components/cursor.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
