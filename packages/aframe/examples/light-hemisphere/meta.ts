// aframe example: light: hemisphere sky and ground colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: hemisphere sky and ground colours",
  summary: "A hemisphere light tints surfaces facing up with color and surfaces facing down with groundColor, like a grassy field under a grey sky. Spheres of one white material show it on their tops and undersides; sliders are not needed, the shapes tumble.",
  section: 'Components',
  tags: ["light", "hemisphere", "color", "groundColor", "intensity"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
