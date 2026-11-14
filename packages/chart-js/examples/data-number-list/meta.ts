// Chart.js example: Data as a plain list of numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data as a plain list of numbers',
  summary:
    'The simplest data: a list of numbers, with a separate list of labels. The label at each position names the number at the same position; for a horizontal chart they run down the y axis instead.',
  section: 'General',
  tags: ['data', 'labels', 'Primitive[]', 'indexAxis'],
  docs: ['repo/docs/general/data-structures.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
