// motion example: Spotlight that moves each axis with its own spring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spotlight that moves each axis with its own spring",
  summary: "Click the grid and a shader spotlight chases the click, with a bouncy spring sideways and a smooth ease up and down, so the path curves. A vector uniform is animated one axis at a time with an X or Y suffix.",
  section: "Integrations",
  tags: ["animate","Vector2","axis suffix","uniforms","per-value transition"],
  docs: ["pages/motion-dev/docs/three.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
