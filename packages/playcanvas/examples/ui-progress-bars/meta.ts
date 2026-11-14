// PlayCanvas: Progress and health bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Progress and health bars",
  summary:
    "The fill of a bar follows its value through its right anchor, which squashes a textured fill; anchoring the fill to the left and setting width and rect together crops it instead. A third bar changes colour from green to red as it empties.",
  section: "User Interface",
  tags: ["anchor","rect","width","texture","color"],
  docs: ["repo/docs/user-manual/user-interface/common-widgets.md","repo/docs/user-manual/user-interface/elements.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
