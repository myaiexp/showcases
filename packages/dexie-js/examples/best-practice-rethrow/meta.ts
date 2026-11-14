// dexie-js example: Catch and log, but rethrow to abort
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Catch and log, but rethrow to abort",
  summary: "Catching a database error in order to log it counts as handling it, and the transaction commits anyway. Rethrowing the error after logging keeps the abort, and the earlier writes are undone.",
  section: "Getting started",
  tags: ["transaction", "catch", "throw", "add"],
  docs: ["repo/docs/Tutorial/Best-Practices.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
