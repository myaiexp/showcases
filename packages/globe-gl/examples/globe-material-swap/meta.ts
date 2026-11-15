// globe-gl example: Globe: globeMaterial, a material of your own
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: globeMaterial, a material of your own",
  summary:
    "globeMaterial(material) swaps the sphere's Three.js material for one you build: a metallic standard material, a toon material, a flat Lambert colour, normals as colours or a wireframe. globeImageUrl is not used, so the materials carry their own map.",
  section: "Globe Layer",
  tags: ["globeMaterial", "MeshStandardMaterial", "MeshToonMaterial", "MeshNormalMaterial"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
