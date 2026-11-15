// tanstack-charts example: Overview brush and detail chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overview brush and detail chart',
  summary:
    'A focus-and-context pair: the small overview chart owns a brush, and the large chart shows only the rows inside the committed range with its x scale set to that range. The application keeps the accepted range and rebuilds both definitions from it.',
  section: 'Interactions and Selections',
  tags: ['brushX', 'focus and context', 'linked views', 'controlledSignal'],
  docs: ['repo/docs/guides/interactions-and-selections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
