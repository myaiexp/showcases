// tanstack-charts example: A minimap brush and a zoomable chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A minimap brush and a zoomable chart',
  summary:
    'One accepted window drives two controls. The large chart uses zoomX for wheel, drag and keyboard, and the small overview below carries a brushX showing the same window. Moving either one updates both, because the application stores a single semantic window.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'brushX', 'linked views', 'controlledSignal'],
  docs: ['repo/docs/guides/interactions-and-selections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
