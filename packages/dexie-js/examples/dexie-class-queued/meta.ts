// dexie-js example: Use the database before it is open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Use the database before it is open",
  summary: "A Dexie database is declared and then simply used. Nobody calls open(): the calls made before it is open wait, then run in the order they were sent, and a read sent last sees the writes sent before it.",
  section: "Getting started",
  tags: ["new Dexie", "isOpen", "add", "toArray"],
  docs: ["repo/docs/Tutorial/Design.md", "repo/docs/Dexie/Dexie.isOpen().md", "repo/docs/Dexie/Dexie.open().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
