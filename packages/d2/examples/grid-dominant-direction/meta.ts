// d2 example: Dominant direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dominant direction',
  summary:
    'With both set, the first one written is the dominant direction: `grid-rows` first fills rows before moving on to columns, and the reverse order fills columns first. The same six shapes land in different cells.',
  section: 'Grid Diagrams',
  tags: ['grid-rows', 'grid-columns'],
  docs: ['repo/docs/tour/grid-diagrams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
