// galacean example: ShaderLab custom include snippet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab custom include snippet",
  summary: "ShaderFactory.registerInclude stores your own GLSL under a key and #include pulls it in: a toon-shading function drawn as banded spheres with 2, 3 and 6 bands while the light circles.",
  section: "ShaderLab",
  tags: ['ShaderFactory.registerInclude','#include'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-05-advance.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
