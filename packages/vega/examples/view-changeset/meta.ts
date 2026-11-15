// vega example: View: Changeset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Insert and Remove in One Changeset',
  summary:
    'The same edit applied twice, two rows in and the oldest out: the left chart uses separate view.insert and view.remove calls and loses the insert, the right one uses vega.changeset with view.change and gets both.',
  section: 'View API',
  tags: ['view.change', 'view.insert', 'view.remove', 'changeset.insert', 'changeset.remove'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
