// galacean example: ShaderLab skeletal animation with Skin.glsl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab skeletal animation with Skin.glsl",
  summary: "The advanced tutorial's skinned shader: #include \"Skin.glsl\" and getSkinMatrix(attr) bend a skinned tentacle through its bone weights, drawn with a custom shader instead of the model's own material.",
  section: "ShaderLab",
  tags: ['Skin.glsl','getSkinMatrix','RENDERER_HAS_SKIN','JOINTS_0','WEIGHTS_0'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-05-advance.mdx',
    'repo/docs/en/graphics/material/shaderAPI.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
