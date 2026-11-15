// d2 example: The same diagram as SVG and ASCII
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The same diagram as SVG and ASCII",
  summary:
    "One compiled diagram of nested containers is rendered twice: once to SVG and once with `ascii: true`. The ASCII renderer scales down an ELK layout, so the SVG is laid out with ELK too.",
  section: "Exports",
  tags: ["ascii", "elk", "render"],
  docs: [
    "repo/blog/ascii.md",
    "repo/static/d2/ascii-ex.d2",
    "repo/docs/tour/exports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
