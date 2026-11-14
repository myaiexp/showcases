// Chart.js example: Your first chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your first chart',
  summary:
    'The bar chart from the getting-started page: a type, labels and one dataset, with votes for six mug colours. Press a button to add a vote and the bars animate; beginAtZero keeps the axis honest.',
  section: 'Getting started',
  tags: ['bar', 'getting-started', 'update'],
  docs: ['repo/docs/getting-started/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
