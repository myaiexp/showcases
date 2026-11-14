// motion example: 3D headphones that spin and bounce on a spring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D headphones that spin and bounce on a spring",
  summary: "A pair of headphones built from simple 3D shapes. Each click gives them a spin, a hop and a size pulse on springs, and a new click mid-spin picks up the speed the last one had. Motion animates the Three.js mesh directly.",
  section: "Integrations",
  tags: ["animate","threeEffect","spring","rotateY","scale"],
  docs: ["pages/motion-dev/docs/three.md","pages/motion-dev/docs/spring.md","pages/motion-dev/docs/motion-value.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
