// dexie-js example: Transfer: both steps or neither
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transfer: both steps or neither",
  summary: "Alice sends Bob money in two writes. When both work, both are kept. When the second step fails, the first one is undone and the balances stay as they were. That all-or-nothing promise is what a transaction is for.",
  section: 'Transaction',
  tags: ["transaction", "on complete", "on abort", "on error", "update"],
  docs: ["repo/docs/Dexie/Dexie.transaction().md", "repo/docs/Tutorial/Design.md", "repo/docs/Tutorial/Best-Practices.md", "repo/docs/Transaction/Transaction.on.complete.md", "repo/docs/Transaction/Transaction.on.abort.md", "repo/docs/Transaction/Transaction.on.error.md", "repo/docs/Table/Table.update().md"],
  provenance: 'pure',
  added: '2026-11-14',
});
