// vchart example: Custom label text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom label text',
  summary:
    'Four ways to change what a bar label says: a style.text function of the datum, a formatMethod, a formatter template with field names and a formatMethod that returns rich text. A selector switches the spec; the card steps through them.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['label.style.text', 'label.formatMethod', 'label.formatter', 'rich text'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Label.md', 'repo/docs/assets/option/en/component/label.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
