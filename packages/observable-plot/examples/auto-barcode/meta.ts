// observable-plot example: Auto: barcode with reduce null
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: barcode with reduce null',
  summary:
    'y: {reduce: null} opts out of grouping, so every row is drawn as its own mark along one axis.',
  section: 'Mark: Auto',
  tags: ['auto', 'reduce'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
