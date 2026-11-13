// Three.js example: bloom node composed over a scene pass in a RenderPipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom post-processing',
  summary:
    'A pass() scene render and a bloom() node composed in a RenderPipeline: the glow is added back over the beauty pass, and strength, radius and threshold are live uniform nodes.',
  section: 'WebGPU',
  tags: ['RenderPipeline', 'pass', 'bloom', 'BloomNode', 'post-processing'],
  docs: [
    'repo/manual/pages/webgpu-postprocessing.html',
    'repo/docs/pages/BloomNode.html.md',
    'repo/docs/pages/RenderPipeline.html.md',
    'repo/docs/llms-full.txt',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
