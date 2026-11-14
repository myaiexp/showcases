// observable-plot example: Accessibility: a label for every dot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Accessibility: a label for every dot',
  summary:
    'The mark ariaLabel option labels each dot from its data and ariaDescription describes the whole mark; a cursor steps through the dots.',
  section: 'Accessibility',
  tags: ['ariaLabel', 'ariaDescription', 'dot'],
  docs: ['repo/docs/features/accessibility.md', 'repo/docs/features/marks.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
