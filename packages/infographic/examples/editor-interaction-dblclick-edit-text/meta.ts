// AntV Infographic example: Editor interaction: DblClickEditText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor interaction: DblClickEditText",
  summary:
    "DblClickEditText lets a double-click turn a label into editable text, and commits the change as an editor command. Try it in the full view. The card issues the same UpdateTextCommand a finished edit would, growing a label word by word.",
  section: "Editor",
  tags: ["DblClickEditText", "UpdateTextCommand", "interactions"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
