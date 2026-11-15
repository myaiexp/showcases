// galacean example: ShaderLab debug colours with macros
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab debug colours with macros",
  summary: "One ShaderLab shader paints UVs, normals or positions as colour, chosen by which macro each material enables (DEBUG_UV, DEBUG_NORMAL, DEBUG_POSITION): the debug-colour trick from the advanced tutorial.",
  section: "ShaderLab",
  tags: ['enableMacro','Shader.create','#ifdef','NORMAL','TEXCOORD_0'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-05-advance.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-03-ui-script.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
