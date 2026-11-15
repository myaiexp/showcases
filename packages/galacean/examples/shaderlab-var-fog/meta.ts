// galacean example: ShaderLab fog variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab fog variables",
  summary: "A hand-written shader calls fog(color, positionVS) from #include \"Fog.glsl\", which reads scene_FogColor and scene_FogParams, so a row of receding columns melts into the fog colour. The card cycles Linear, Exponential and ExponentialSquared.",
  section: "ShaderLab",
  tags: ['Fog.glsl','fog','scene_FogColor','scene_FogParams','Scene.fogMode'],
  docs: [
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/shaderAPI.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
