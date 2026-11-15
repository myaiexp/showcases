// postprocessing example: DepthCopyPass and its depth packing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DepthCopyPass: depth packing',
  summary:
    'DepthCopyPass copies the depth the RenderPass already wrote into a render target of its own. With RGBADepthPacking it is an 8-bit RGBA texture, with BasicDepthPacking a float texture holding depth in red; a ShaderPass unpacks either into the same grey picture.',
  section: 'Passes',
  tags: ['DepthCopyPass', 'depthPacking', 'RGBADepthPacking', 'BasicDepthPacking', 'needsDepthTexture', 'texture'],
  docs: ['repo/src/passes/DepthCopyPass.js', 'repo/src/materials/DepthCopyMaterial.js', 'repo/src/core/EffectComposer.js', 'repo/src/passes/ShaderPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
