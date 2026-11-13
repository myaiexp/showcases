// Three.js example: dotScreen, rgbShift and film chained as nodes in one RenderPipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Combining effects in one node graph',
  summary:
    'The effect chain is a node composition: each of dotScreen(), rgbShift() and film() takes the previous node as input. Toggling an effect rebuilds the chain and sets RenderPipeline.needsUpdate.',
  section: 'WebGPU',
  tags: ['RenderPipeline', 'dotScreen', 'rgbShift', 'film', 'needsUpdate', 'post-processing'],
  docs: [
    'repo/manual/pages/webgpu-postprocessing.html',
    'repo/docs/pages/RenderPipeline.html.md',
    'repo/docs/pages/DotScreenNode.html.md',
    'repo/docs/pages/RGBShiftNode.html.md',
    'repo/docs/pages/FilmNode.html.md',
    'repo/docs/llms-full.txt',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
