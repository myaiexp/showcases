// Perspective example: a first viewer bound to a client and restored onto a named table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A first viewer',
  summary:
    'One named Table in the Web Worker, a <perspective-viewer> bound with load(client), and restore() choosing the table, the Datagrid plugin and a grouped query. Open the settings panel to drag columns around.',
  section: 'Viewer',
  tags: ['load', 'restore', 'table name', 'Datagrid', 'group_by', 'settings'],
  docs: [
    'repo/docs/md/how_to/javascript/viewer.md',
    'repo/docs/md/how_to/javascript/importing.md',
    'repo/docs/md/how_to/javascript/worker.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
