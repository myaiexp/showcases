// mermaid example: one flowchart, many layout engines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One flowchart, many layout engines",
  summary:
    "Pick dagre, elk, an ELK algorithm or cose-bilkent in frontmatter and watch the same flowchart lay out differently.",
  section: "Layouts",
  tags: ["layout","dagre","elk","cose-bilkent"],
  docs: ["repo/packages/mermaid/src/docs/config/layouts.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
