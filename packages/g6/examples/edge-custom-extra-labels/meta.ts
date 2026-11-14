// g6 example: Custom edge: extra end labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom edge: extra end labels',
  summary:
    'A Line subclass that draws text at both ends of the edge with upsert, driven by startLabelText and endLabelText.',
  section: 'Edge',
  tags: ['register', 'Line', 'render', 'upsert', 'subStyleProps'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/custom-edge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
