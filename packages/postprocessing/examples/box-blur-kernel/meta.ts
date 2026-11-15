// postprocessing example: BoxBlurPass kernel and iterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Box blur kernel and iterations',
  summary:
    'A BoxBlurPass averages a square of pixels. Sizes 3 and 5 use optimised code paths; iterations repeats the blur, and repeated box blurs approach a Gaussian.',
  section: 'Blur',
  tags: ['BoxBlurPass', 'kernelSize', 'iterations', 'blurMaterial'],
  docs: ['repo/README.md', 'repo/src/passes/BoxBlurPass.js', 'repo/src/materials/BoxBlurMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
