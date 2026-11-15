// galacean example: ShaderLab world-space pattern
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab world-space pattern",
  summary: "The checker is computed from the world position (renderer_ModelMat times the vertex), so it stays put while the sphere glides and turns through it: the pattern belongs to space, not to the mesh.",
  section: "ShaderLab",
  tags: ['renderer_ModelMat','renderer_LocalMat','renderer_MVMat'],
  docs: [
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/shaderAPI.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
