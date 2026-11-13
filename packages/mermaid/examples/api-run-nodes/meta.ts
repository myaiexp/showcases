// mermaid example: mermaid.run on scoped pre blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mermaid.run on scoped pre blocks",
  summary:
    "Several pre.mermaid blocks are rendered in one call with mermaid.run({ nodes }), scoped to this example instead of the whole document.",
  section: "API usage",
  tags: ["run","nodes","pre.mermaid"],
  docs: ["repo/packages/mermaid/src/docs/config/usage.md","repo/docs/config/setup/mermaid/interfaces/RunOptions.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
