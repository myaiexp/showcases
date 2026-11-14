// dexie-js example: A reading hook changes rows on their way out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A reading hook changes rows on their way out",
  summary: "Emails are hidden whenever a row is read: the grid, get() and every query show s***@home.org. A second connection without the hook shows the real value, proving the stored row is untouched. Note that the grid's own live query reads through the hook too.",
  section: "Hooks and middleware",
  tags: ["hook","reading","mask"],
  docs: ["repo/docs/Table/Table.hook('reading').md"],
  provenance: 'pure',
  added: '2026-11-14',
});
