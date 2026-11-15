// postprocessing example: GaussianBlurPass kernel size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gaussian blur kernel size',
  summary:
    'A GaussianBlurPass whose kernelSize grows from 3 to over a hundred taps. The kernel must be odd; the blur runs as a horizontal and a vertical pass, so the cost grows linearly with the size.',
  section: 'Blur',
  tags: ['GaussianBlurPass', 'kernelSize', 'blurMaterial', 'GaussianBlurMaterial'],
  docs: ['repo/README.md', 'repo/src/passes/GaussianBlurPass.js', 'repo/src/materials/GaussianBlurMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
