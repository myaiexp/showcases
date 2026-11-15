// galacean example: ShaderLab light API
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab light API",
  summary: "A custom shader loops over the scene's directional lights with #include \"Light.glsl\" and getDirectLight(i), adding a Lambert term per light. Two coloured suns circle the shapes.",
  section: "ShaderLab",
  tags: ['Light.glsl','getDirectLight','SCENE_DIRECT_LIGHT_COUNT','DirectLight'],
  docs: [
    'repo/docs/en/graphics/material/shaderAPI.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
