// fabric example: Text: insertChars and removeChars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: insertChars and removeChars",
  summary:
    "insertChars(text, style, start) and removeChars(start, end) edit an IText from code, keeping per-character styles aligned; no keyboard or editing mode involved.",
  section: 'Text',
  tags: ["IText","insertChars","removeChars","styles"],
  docs: ["repo/src/content/docs/api/classes/IText.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
