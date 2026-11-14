// playcanvas example: Particle depth softening
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle depth softening",
  summary: "Smoke slides through a floor and two pillars. With depthSoftening above zero, and a depth map requested from the camera, the particles fade near surfaces instead of cutting into them.",
  section: "Components",
  tags: ["depthSoftening","requestSceneDepthMap","depthWrite"],
  docs: ["repo/docs/user-manual/editor/scenes/components/particlesystem.md","repo/docs/user-manual/editor/scenes/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
