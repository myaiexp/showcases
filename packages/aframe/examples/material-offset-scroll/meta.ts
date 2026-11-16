// aframe example: material: scroll a texture with offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: scroll a texture with offset",
  summary: "Animating material.offset slides a texture across its surface without moving the mesh: a striped belt scrolls along X, and a second plane with repeat 2 2 scrolls diagonally. Each tween goes through the animation component's property: material.offset.",
  section: 'Components',
  tags: ["material", "offset", "repeat", "animation", "texture", "material.offset"],
  docs: ["repo/docs/components/material.md", "repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
