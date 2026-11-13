// mermaid example: live syntax validator with parse and detecttype
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Live syntax validator with parse and detectType",
  summary:
    "Type a definition: mermaid.parse with suppressErrors validates it without rendering and mermaid.detectType names its diagram type, live.",
  section: "API usage",
  tags: ["parse","detectType","suppressErrors","validation"],
  docs: ["repo/packages/mermaid/src/docs/config/usage.md","repo/docs/config/setup/mermaid/interfaces/Mermaid.md","repo/docs/config/setup/mermaid/interfaces/ParseOptions.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
