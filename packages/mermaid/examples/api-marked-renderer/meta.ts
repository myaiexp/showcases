// mermaid example: A marked renderer that hands code fences to Mermaid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A marked renderer that hands code fences to Mermaid",
  summary: "A custom marked Renderer turns mermaid fences into pre.mermaid blocks and leaves other code alone, then mermaid.run draws them; edit the Markdown and it re-renders.",
  section: "API usage",
  tags: ["api","marked","renderer","markdown","run"],
  docs: ["repo/packages/mermaid/src/docs/config/usage.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
