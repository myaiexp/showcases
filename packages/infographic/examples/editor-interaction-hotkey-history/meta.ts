// AntV Infographic example: Editor interaction: HotkeyHistory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor interaction: HotkeyHistory",
  summary:
    "HotkeyHistory maps Ctrl/Cmd+Z to undo and Ctrl/Cmd+Shift+Z or Ctrl/Cmd+Y to redo over the commands the editor ran. In the full view, recolour a label with the button, click the drawing, then press the keys. The card runs two changes and then undoes and redoes them.",
  section: "Editor",
  tags: ["HotkeyHistory", "UpdateElementCommand", "commander"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
