// mermaid example: the init directive changes one diagram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The init directive changes one diagram",
  summary:
    "The deprecated %%{init: ...}%% directive overrides theme, fontFamily and per-diagram config; toggle it on a sequence diagram.",
  section: "Directives",
  tags: ["directive","init","sequence","wrap"],
  docs: ["repo/packages/mermaid/src/docs/config/directives.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
