// @var(--lg) stays a var() inside a stored rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Var: a reference that survives use=",
  summary: "The doodle code lives in a custom property named by the use attribute, and the browser would replace a plain var() inside it before css-doodle reads it. @var(--lg) is written out as var(--lg) only when the code is generated, so the gradient reference stays intact.",
  section: "Values",
  tags: ["@var","use","@p"],
  docs: ["pages/css-doodle-com/reference/function-var.md","pages/css-doodle-com/reference/attribute-use.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
