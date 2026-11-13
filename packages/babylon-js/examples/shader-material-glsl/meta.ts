// babylon-js example: Shader material with inline GLSL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shader material with inline GLSL",
  summary:
    "A ShaderMaterial whose vertex and fragment GLSL live in Effect.ShadersStore, with a time uniform animating a wavy sphere.",
  section: 'Materials',
  tags: ['ShaderMaterial', 'Effect.ShadersStore', 'setFloat', 'uniforms'],
  docs: [
    'repo/content/features/featuresDeepDive/materials/shaders/shaderMaterial.md',
    'repo/content/features/featuresDeepDive/materials/shaders/shaderCodeInBjs.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
