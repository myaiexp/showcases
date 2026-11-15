// galacean example: ShaderLab depth test as X-ray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab depth test as X-ray",
  summary: "A DepthState whose CompareFunction is a variable: the sphere behind the wall is hidden with LessEqual and shows through it with Always. The card flips between them.",
  section: "ShaderLab",
  tags: ['DepthState','CompareFunction','shaderData.setInt'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
