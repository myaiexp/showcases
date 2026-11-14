// dexie-js example: A key you supply yourself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A key you supply yourself",
  summary: "Without the ++ in front of the key, nobody numbers your rows. Adding with an id of your own works, adding without one is refused, and so is reusing an id that is taken. The message shows what Dexie reports.",
  section: "Schema and versions",
  tags: ["stores", "add", "primary key", "DataError", "ConstraintError"],
  docs: ["repo/docs/Version/Version.stores().md", "repo/docs/Tutorial/Understanding-the-basics.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
