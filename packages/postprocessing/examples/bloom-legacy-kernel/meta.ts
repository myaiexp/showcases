// postprocessing example: legacy bloom with a Kawase kernel size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom without mipmaps: KernelSize',
  summary:
    'Setting mipmapBlur to false brings back the older bloom, blurred by a KawaseBlurPass. KernelSize runs from VERY_SMALL to HUGE and sets the reach of the glow; resolution.scale sets the size of the buffer it is blurred in. The docs mark this route deprecated.',
  section: 'Bloom',
  tags: ['BloomEffect', 'mipmapBlur', 'KernelSize', 'kernelSize', 'resolutionScale', 'resolution'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/enums/KernelSize.js', 'repo/src/passes/KawaseBlurPass.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
