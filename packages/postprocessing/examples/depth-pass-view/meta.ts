// postprocessing example: DepthPass texture shown on screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DepthPass: the depth texture',
  summary:
    'DepthPass draws the scene with a depth material into an RGBA-packed render target. A ShaderPass unpacks and linearises it into a grey picture (near is bright); the raw view shows the packed texture, and a slider changes the pass\'s resolution scale.',
  section: 'Passes',
  tags: ['DepthPass', 'texture', 'resolution', 'RGBADepthPacking', 'ShaderPass', 'EffectComposer'],
  docs: ['repo/README.md', 'repo/src/passes/DepthPass.js', 'repo/src/passes/ShaderPass.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
