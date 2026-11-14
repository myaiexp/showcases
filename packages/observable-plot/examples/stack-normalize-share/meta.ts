// observable-plot example: Stack: normalized shares
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: normalized shares',
  summary:
    'Normalize offset rescales each year to fill zero to one, so the chart shows each format share of revenue.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'offset', 'percent'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
