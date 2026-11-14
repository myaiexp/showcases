// observable-plot example: Accessibility: automatic mark labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Accessibility: automatic mark labels',
  summary:
    'Every mark writes an aria-label on its group, such as dot, and axes and grids add the scale, such as y-axis tick; the readout lists them.',
  section: 'Accessibility',
  tags: ['ariaLabel', 'axis', 'grid', 'dot'],
  docs: ['repo/docs/features/accessibility.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
