// fabric example: Text: Superscript and subscript
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Superscript and subscript",
  summary:
    "setSuperscript(start, end) and setSubscript(start, end) shrink a range and shift its baseline; the superscript and subscript schemas set the factors.",
  section: 'Text',
  tags: ["FabricText","setSuperscript","setSubscript","superscript","subscript","deltaY"],
  docs: ["repo/src/content/docs/api/classes/FabricText.md", "repo/src/content/docs/api/type-aliases/TextStyleDeclaration.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
