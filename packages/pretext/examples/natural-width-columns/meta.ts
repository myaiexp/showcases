// Pretext example: table column widths from measureNaturalWidth()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto-sized table columns',
  summary:
    'measureNaturalWidth() gives each cell its widest-line width, where only explicit line breaks apply. A column takes its widest cell up to a cap; capped cells (tinted) wrap, and layout() supplies their row height.',
  section: 'Manual line layout',
  tags: ['measureNaturalWidth', 'layout', 'table', 'pre-wrap'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
