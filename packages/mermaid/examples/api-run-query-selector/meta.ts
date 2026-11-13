// mermaid example: mermaid.run with querySelector, suppressErrors and postRenderCallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mermaid.run with querySelector, suppressErrors and postRenderCallback",
  summary: "A scoped querySelector picks the pre blocks to draw; a deliberately broken block shows the exception versus suppressErrors, and postRenderCallback lists each rendered id.",
  section: "API usage",
  tags: ["api","run","querySelector","suppressErrors","postRenderCallback"],
  docs: ["repo/packages/mermaid/src/docs/config/usage.md","repo/docs/config/setup/mermaid/interfaces/RunOptions.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
