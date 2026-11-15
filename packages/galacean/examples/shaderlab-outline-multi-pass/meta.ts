// galacean example: ShaderLab outline in two passes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab outline in two passes",
  summary: "The multi-pass tutorial's outline: pass one pushes vertices out along their normals and draws only back faces in the outline colour, pass two draws the shaded object over it. Width and colour are shader uniforms.",
  section: "ShaderLab",
  tags: ['Pass','CullMode.Front','NORMAL','material_OutlineWidth'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-04-multi-pass.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
