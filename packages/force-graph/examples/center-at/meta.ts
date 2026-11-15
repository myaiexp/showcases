// force-graph example: Render control: centerAt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: centerAt',
  summary:
    'centerAt(x, y, ms) pans the view to graph coordinates, animated over ms. Either coordinate may be left out to move in one dimension; centerAt() with no arguments reads the current centre.',
  section: 'Render control',
  tags: ['centerAt', 'zoom', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
