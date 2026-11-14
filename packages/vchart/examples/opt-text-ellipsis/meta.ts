// vchart example: Text: maxLineWidth, ellipsis and suffixPosition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: maxLineWidth, ellipsis and suffixPosition",
  summary:
    "A long label is cut to maxLineWidth. ellipsis chooses the suffix string, and suffixPosition moves the cut to the start, middle or end of the text. A slider changes the width.",
  section: "Option: Marks and Graphics",
  tags: ["maxLineWidth","ellipsis","suffixPosition","text"],
  docs: [
    'repo/docs/assets/option/en/graphic/text-font.md',
    'repo/docs/assets/option/en/graphic/text.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
