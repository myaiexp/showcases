// mermaid example: securityLevel: strict, antiscript, loose and sandbox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "securityLevel: strict, antiscript, loose and sandbox",
  summary: "Switch securityLevel through mermaid.initialize and re-render one flowchart with an HTML label and a click callback; the page measures what each level did to the label, the click and the output.",
  section: "API usage",
  tags: ["api","securityLevel","security","sandbox","initialize"],
  docs: ["repo/packages/mermaid/src/docs/config/usage.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
