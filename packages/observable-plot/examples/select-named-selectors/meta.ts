// observable-plot example: Select: the six named selectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select: the six named selectors',
  summary:
    'selectFirst, selectLast, selectMinX, selectMaxX, selectMinY and selectMaxY each keep one point per series. A select switches which of them marks the four stocks.',
  section: 'Transform: Select',
  tags: ['dot', 'selectFirst', 'selectLast', 'selectMinX', 'selectMaxX', 'selectMinY', 'selectMaxY'],
  docs: ['repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
