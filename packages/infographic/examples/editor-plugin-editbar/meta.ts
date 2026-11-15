// AntV Infographic example: Editor plugin: EditBar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor plugin: EditBar",
  summary:
    "EditBar is the floating toolbar that follows the selection with text colour, size, alignment and font controls. The full view installs it with ClickSelect and SelectHighlight, so clicking a label opens the bar. The card selects a label from code, so the bar opens, and issues the same kind of change the bar makes, a new fill and size, as an editor command.",
  section: "Editor",
  tags: ["EditBar", "plugins", "UpdateElementCommand"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
