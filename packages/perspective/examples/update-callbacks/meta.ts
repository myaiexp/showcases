// Perspective example: view.on_update in plain and row mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Update callbacks',
  summary:
    'Two on_update callbacks on one View: the plain one learns that a port updated, the { mode: "row" } one also receives the changed rows as an Arrow buffer and a reset flag after clear() or replace(). remove_update() unregisters them.',
  section: 'Advanced View',
  tags: ['on_update', 'remove_update', 'delta', 'Arrow', 'reset', 'port_id'],
  docs: ['repo/docs/md/explanation/view/advanced.md', 'repo/docs/md/explanation/table/clear_and_replace.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
