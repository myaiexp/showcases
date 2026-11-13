// Adapters example: material fields via the mesh shorthand, the material, and ShaderMaterial uniforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: material fields and ShaderMaterial uniforms',
  summary: 'Three spheres: metalness and emissive animated on the mesh (routed to its material), roughness and normalScaleX animated on the material directly, and a ShaderMaterial whose tint, intensity and resolutionX uniforms are tweened by name, changing a striped fragment shader.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'material', 'ShaderMaterial', 'uniforms', 'metalness', 'emissive', 'normalScaleX'],
  docs: [
    'pages/animejs-com/documentation/adapters/threejs-adapter/materials-and-uniforms.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
