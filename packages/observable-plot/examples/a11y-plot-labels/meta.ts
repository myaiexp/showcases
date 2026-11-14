// observable-plot example: Accessibility: plot ariaLabel and description
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Accessibility: plot ariaLabel and description',
  summary:
    'The top-level ariaLabel and ariaDescription options write aria-label and aria-description on the root svg; the readout shows them.',
  section: 'Accessibility',
  tags: ['ariaLabel', 'ariaDescription', 'dot'],
  docs: ['repo/docs/features/accessibility.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
