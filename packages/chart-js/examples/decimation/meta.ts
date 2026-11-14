// Chart.js example: Thinning dense data: decimation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Thinning dense data: decimation',
  summary:
    'Four thousand sensor readings do not fit in a few hundred pixels. The decimation plugin keeps a few: lttb keeps the points that best preserve the shape, min-max keeps the peaks. The readout counts the points actually drawn.',
  section: 'Configuration',
  tags: ['decimation', 'lttb', 'min-max', 'samples', 'performance'],
  docs: ['repo/docs/configuration/decimation.md', 'repo/docs/general/performance.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
