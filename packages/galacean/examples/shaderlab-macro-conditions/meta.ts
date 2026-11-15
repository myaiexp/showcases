// galacean example: ShaderLab conditional compilation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab conditional compilation",
  summary: "Four spheres share one shader and enable different mixes of RED and STRIPES: the pass branches with #if defined(...) && defined(...), #ifdef, #ifndef and #else, so each combination compiles to its own colour.",
  section: "ShaderLab",
  tags: ['#ifdef','#ifndef','#else','#if defined','enableMacro'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-03-ui-script.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-05-advance.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
