// vchart example: Mark styles from functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mark styles from functions',
  summary:
    'A function as a style value receives the datum, so bars above a threshold turn red and the rest stay blue while the corner radius grows with the value. The full view moves the threshold with updateSpec; the card re-rolls the data.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['bar.style.fill', 'bar.style.cornerRadius', 'style function', 'datum', 'updateSpec'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
