// fabric example: Text: Strings are not numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Strings are not numbers",
  summary:
    "A text input hands over strings: set('left', \"120\") keeps the string, so left + 40 concatenates and the text flies off the canvas, while parseFloat first behaves.",
  section: 'Text',
  tags: ["FabricText","left","set","parseFloat"],
  docs: ["repo/src/content/docs/docs/Old docs/gotchas.md", "repo/src/content/docs/api/classes/FabricText.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
