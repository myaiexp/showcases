// postprocessing example: GaussKernel linear weights and offsets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GaussKernel: linear sampling',
  summary:
    'Besides discrete weights and offsets, a GaussKernel computes linearWeights and linearOffsets: neighbouring taps merged so one bilinear texture fetch, placed between two texels, returns their weighted sum. Grey bars are the discrete taps, gold the fewer linear fetches; `steps` and `linearSteps` count each.',
  section: 'Utilities',
  tags: ['GaussKernel', 'weights', 'offsets', 'linearWeights', 'linearOffsets', 'steps', 'linearSteps'],
  docs: ['repo/src/core/GaussKernel.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
