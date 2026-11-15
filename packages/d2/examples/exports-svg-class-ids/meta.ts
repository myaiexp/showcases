// d2 example: Shape IDs as CSS classes in the SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape IDs as CSS classes in the SVG",
  summary:
    "Every shape's element in D2's SVG carries its ID base64-encoded as a CSS class, so CSS or script can pick it after export. This example finds each shape by that class and outlines it. In this build the class keeps base64's \"=\" padding, which the docs' example leaves off.",
  section: "Exports",
  tags: ["svg", "class", "base64", "post-processing"],
  docs: [
    "repo/docs/tour/exports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
