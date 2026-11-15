// galacean example: Renderer.shaderData: per-renderer uniforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Renderer.shaderData: per-renderer uniforms",
  summary:
    "One material, one custom shader, five renderers: each writes its own colour into renderer.shaderData, a per-renderer uniform block, so a shared material can still look different on every object.",
  section: "Renderer",
  tags: ['Renderer.shaderData', 'ShaderData.setColor', 'Shader.create'],
  docs: [
    'repo/docs/en/graphics/renderer/renderer.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
