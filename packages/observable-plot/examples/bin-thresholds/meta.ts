// observable-plot example: Bin: threshold methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: threshold methods',
  summary:
    'The thresholds option chooses the binning rule: auto, Freedman-Diaconis, Scott, Sturges, a bin count hint, an explicit array, or a function of the values.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'thresholds'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
