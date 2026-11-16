// fabric example: Text: Measuring text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Measuring text",
  summary:
    "FabricText measures each grapheme into __charBounds and each line into a width; the example draws those boxes over the text, with kerning visible in kernedWidth.",
  section: 'Text',
  tags: ["FabricText","__charBounds","width","height","getHeightOfLine","textLines","kernedWidth"],
  docs: ["repo/src/content/docs/docs/Old docs/fabric-text.md", "repo/src/content/docs/api/classes/FabricText.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
