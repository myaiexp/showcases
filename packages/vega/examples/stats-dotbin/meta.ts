// vega example: Statistics: dotbin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Dot Plot Bins',
  summary:
    'A Wilkinson dot plot of 70 values built from dotbin: a step slider sets the bin width (and the dot size) and a smooth toggle moves the dots toward their local mean.',
  section: 'Statistics',
  tags: ['statistics.dotbin'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
