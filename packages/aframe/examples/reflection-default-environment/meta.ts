// aframe example: reflection: a default environment for reflective materials
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reflection: a default environment for reflective materials",
  summary: "The reflection component gives every material a default environment cube map, so metal and glossy surfaces stop looking black. Three metallic spheres sit in a scene with a lit sky; a toggle adds or removes reflection on the scene, and the docs' directionalLight property names the light it controls during AR lighting estimation.",
  section: 'Components',
  tags: ["reflection", "directionalLight", "environment", "metalness", "roughness", "a-light", "castShadow"],
  docs: ["repo/docs/components/reflection.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
