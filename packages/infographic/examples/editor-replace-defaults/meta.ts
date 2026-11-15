// AntV Infographic example: Editor: plugins and interactions replace the defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: plugins and interactions replace the defaults",
  summary:
    "Passing plugins or interactions replaces the default set instead of adding to it. The full view rebuilds the editor with four different choices, and the side panel names what is installed. The card selects a label by code under each choice, so only the choices that include SelectHighlight draw the outline.",
  section: "Editor",
  tags: ["editable", "plugins", "interactions", "EditBar", "ClickSelect", "SelectHighlight"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
