// AntV Infographic example: Editor interaction: ClickSelect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor interaction: ClickSelect",
  summary:
    "ClickSelect selects the clicked element, Shift-click adds or removes one, and Esc clears the selection. The full view shows the outlines; the card replays the three gestures by calling the selection manager: select, add, then clear.",
  section: "Editor",
  tags: ["ClickSelect", "SelectHighlight", "interactions"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
