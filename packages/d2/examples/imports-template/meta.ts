// d2 example: A shared template container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A shared template container",
  summary:
    "A wrapper file sets only a container's style (dotted fill, border, shadow) and an empty label; each diagram spreads it into its outer container, so different diagrams share the same frame.",
  section: "Imports",
  tags: ["import", "spread", "style", "template"],
  docs: [
    "repo/docs/tour/imported-template.md",
    "repo/static/d2/imports-template.d2",
    "repo/static/d2/imports-wrapper-template.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
