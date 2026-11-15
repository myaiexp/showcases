// globe-gl example: Globe: globeMaterial, the default Phong
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: globeMaterial, the default Phong",
  summary:
    "Called with no argument, globeMaterial() returns the globe's Three.js MeshPhongMaterial, so its other maps can be set directly: a specular map painted white over the oceans makes the water glint under the scene light while land stays matte.",
  section: "Globe Layer",
  tags: ["globeMaterial", "MeshPhongMaterial", "specularMap", "shininess"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
