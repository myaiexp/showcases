// postprocessing example: Kawase blur scale and resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Kawase blur scale and resolution',
  summary:
    'Two ways to tune a KawaseBlurPass besides the kernel: blurMaterial.scale stretches the sample offsets, and resolution.scale blurs a smaller buffer, which is cheaper and softer but blockier.',
  section: 'Blur',
  tags: ['KawaseBlurPass', 'blurMaterial', 'scale', 'resolution', 'Resolution'],
  docs: ['repo/README.md', 'repo/src/passes/KawaseBlurPass.js', 'repo/src/materials/KawaseBlurMaterial.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
