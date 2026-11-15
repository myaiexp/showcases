// d2 example: Cells expand to fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cells expand to fill',
  summary:
    'When just one of rows and columns is set, shapes in a short row expand so each row spans the full width. Here `Voters` and `Non-voters` stretch under the wider government shape.',
  section: 'Grid Diagrams',
  tags: ['grid-rows', 'width'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-fill.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
