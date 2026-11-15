// postprocessing example: the weights GaussKernel computes for a kernel size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GaussKernel: weights per kernel size',
  summary:
    'A GaussKernel turns an odd kernel size into binomial (Pascal triangle) weights, centre tap first. The chart in the corner plots them while a GaussianBlurPass of the same size blurs the scene: larger kernels spread the weight over more taps, so each tap counts for less.',
  section: 'Utilities',
  tags: ['GaussKernel', 'weights', 'offsets', 'steps', 'GaussianBlurPass', 'kernelSize'],
  docs: ['repo/README.md', 'repo/src/core/GaussKernel.js', 'repo/src/passes/GaussianBlurPass.js', 'repo/src/materials/GaussianBlurMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
