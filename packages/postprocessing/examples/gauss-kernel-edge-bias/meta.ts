// postprocessing example: GaussKernel edgeBias against the plain binomial row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GaussKernel: edgeBias',
  summary:
    'GaussKernel builds a row of Pascal\'s triangle that is edgeBias * 2 entries longer than the kernel size and cuts that many off each side, which drops the vanishing outer weights. The grey bars are edgeBias 0, the gold ones the chosen bias, both for a 21-tap kernel: a larger bias keeps a wider, flatter bell.',
  section: 'Utilities',
  tags: ['GaussKernel', 'edgeBias', 'weights'],
  docs: ['repo/src/core/GaussKernel.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
