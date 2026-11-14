// tanstack-charts example: Inferred or fixed domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inferred or fixed domain',
  summary:
    'A scale factory infers its domain from the marks; a configured instance keeps the domain you set. Scale the data down to see the axis follow in one case and the bars shrink in the other.',
  section: 'Scales',
  tags: ['scaleLinear', 'domain', 'nice', 'factory'],
  docs: ['repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
