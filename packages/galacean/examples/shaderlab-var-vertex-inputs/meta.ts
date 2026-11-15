// galacean example: ShaderLab vertex colour and second UV set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab vertex colour and second UV set",
  summary: "A hand-built ModelMesh quad carries vertex colours and a second UV set; the Attributes struct names COLOR_0, TEXCOORD_0 and TEXCOORD_1 and the shader blends the interpolated colour with a ring pattern drawn from the second set.",
  section: "ShaderLab",
  tags: ['COLOR_0','TEXCOORD_1','ModelMesh'],
  docs: [
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-01-basic-shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
