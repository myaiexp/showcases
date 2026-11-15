// In code written in the element, var() just works
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Var: a plain var() in the element",
  summary: "When the code is written directly in the element the browser never sees it as a property value, so a plain var(--bg) works without @var. The gradient reads the --bg declared above it.",
  section: "Values",
  tags: ["var()","--bg","@r","linear-gradient"],
  docs: ["pages/css-doodle-com/reference/function-var.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
