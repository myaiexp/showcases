// aframe example: text: only a geometry makes text hittable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "text: only a geometry makes text hittable",
  summary: "The docs warn that text is not suitable for raycaster tests. Two labels get the same mouse cursor: the plain text never receives mouseenter, while the one with a plane geometry beside it does and lights up. A pretend mouse sweeps across both in the card.",
  section: 'Components',
  tags: ["text", "geometry", "raycaster", "cursor", "mouseenter", "limitations"],
  docs: ["repo/docs/components/text.md", "repo/docs/components/cursor.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
