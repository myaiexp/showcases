// postprocessing example: KawaseBlurPass kernel sizes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Kawase blur kernel sizes',
  summary:
    'A KawaseBlurPass added straight to the composer, with each KernelSize from VERY_SMALL to HUGE. The kernel is a sequence of small offset blurs, so a bigger size reaches farther without a bigger cost per pass.',
  section: 'Blur',
  tags: ['KawaseBlurPass', 'KernelSize', 'kernelSize'],
  docs: ['repo/README.md', 'repo/src/passes/KawaseBlurPass.js', 'repo/src/enums/KernelSize.js', 'repo/src/materials/KawaseBlurMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
