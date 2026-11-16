// fabric example: Text: Editing events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Editing events",
  summary:
    "Double click an IText to edit in place and watch editing:entered, selection:changed, text:changed and editing:exited arrive in a log.",
  section: 'Text',
  tags: ["IText","enterEditing","exitEditing","editing:entered","editing:exited","selection:changed","text:changed"],
  docs: ["repo/src/content/docs/api/classes/IText.md", "repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
