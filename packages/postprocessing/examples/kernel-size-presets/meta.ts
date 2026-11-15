// postprocessing example: what each KernelSize enum value corresponds to
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'KernelSize presets as Gaussians',
  summary:
    'KernelSize names five blur widths that the JSDoc says match a 7x7, 25x25, 63x63, 127x127 and 391x391 Gaussian blur (HUGE matches none). The chart builds a GaussKernel for each of those sizes and plots its weights relative to the centre tap, so the widths of the presets can be compared.',
  section: 'Utilities',
  tags: ['KernelSize', 'GaussKernel', 'weights'],
  docs: ['repo/src/enums/KernelSize.js', 'repo/src/core/GaussKernel.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
