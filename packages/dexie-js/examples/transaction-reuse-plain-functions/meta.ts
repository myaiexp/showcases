// dexie-js example: Plain functions join your transaction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plain functions join your transaction",
  summary: "A helper function has no transaction of its own. Called alone, each call is saved separately. Called inside a transaction that later fails, all its work is undone together.",
  section: 'Transaction',
  tags: ["transaction", "modify", "where"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/API-Reference.md", "repo/docs/Collection/Collection.modify().md", "repo/docs/Table/Table.where().md", "repo/docs/WhereClause/WhereClause.equals().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
