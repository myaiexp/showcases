// PlayCanvas: Anchors, pivots and margins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Anchors, pivots and margins",
  summary:
    "Four squares anchored to the corners of a resizing parent keep their size and stick to their corner; a bar with a split anchor stretches with margins; a square rotates about its own pivot. The full view resizes the parent and changes the bar's margin.",
  section: "User Interface",
  tags: ["anchor","pivot","margin","width","height","calculatedWidth"],
  docs: ["repo/docs/user-manual/user-interface/elements.md","repo/docs/user-manual/editor/scenes/components/element.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
