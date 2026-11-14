// motion example: Flip card with a front and a back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flip card with a front and a back",
  summary: "A card that flips over to show its back when you press it, like a flashcard. The parent gives perspective, the faces hide when turned away, and Motion springs rotateY.",
  section: "Guides",
  tags: ["rotateY","perspective","backface-visibility","press"],
  docs: ["pages/motion-dev/docs/3d-transforms.md","pages/motion-dev/docs/press.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
