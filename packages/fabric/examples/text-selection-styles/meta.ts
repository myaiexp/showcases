// fabric example: Text: setSelectionStyles and getSelectionStyles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: setSelectionStyles and getSelectionStyles",
  summary:
    "setSelectionStyles(style, start, end) writes fill, weight, size, underline or background into a character range; getSelectionStyles(start, end) reads the stored styles back.",
  section: 'Text',
  tags: ["FabricText","setSelectionStyles","getSelectionStyles","styles"],
  docs: ["repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md", "repo/src/content/docs/api/classes/FabricText.md", "repo/src/content/docs/api/type-aliases/TextStyleDeclaration.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
