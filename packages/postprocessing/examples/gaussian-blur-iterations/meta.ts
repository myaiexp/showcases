// postprocessing example: GaussianBlurPass iterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gaussian blur iterations',
  summary:
    'Repeating a small GaussianBlurPass kernel with iterations compounds the blur: a few passes of a modest kernel spread wider than one pass of the same size, at a multiple of the cost.',
  section: 'Blur',
  tags: ['GaussianBlurPass', 'iterations', 'kernelSize'],
  docs: ['repo/README.md', 'repo/src/passes/GaussianBlurPass.js', 'repo/src/materials/GaussianBlurMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
