// Chart.js example: Drawing 100,000 points quickly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drawing 100,000 points quickly',
  summary:
    'A sensor log of 100,000 readings, drawn in a fraction of a second. parsing: false, normalized: true, no animation, pointRadius 0 and spanGaps each skip work; switch them off one by one and watch the build time climb.',
  section: 'General',
  tags: ['performance', 'parsing', 'normalized', 'animation', 'pointRadius', 'spanGaps'],
  docs: ['repo/docs/general/performance.md', 'repo/docs/general/data-structures.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
