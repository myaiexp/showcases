// dexie-js example: ConstraintError: a unique index refuses a duplicate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ConstraintError: a unique index refuses a duplicate",
  summary: "Every email in the table must be unique. A new email is saved, but a copy of an existing one makes add() and put() fail with a red ConstraintError. The grid shows nothing was stored or changed.",
  section: "Errors",
  tags: ["ConstraintError","unique index"],
  docs: ["repo/docs/DexieErrors/Dexie.ConstraintError.md","repo/docs/IndexSpec.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
