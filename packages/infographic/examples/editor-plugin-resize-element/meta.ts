// AntV Infographic example: Editor plugin: ResizeElement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor plugin: ResizeElement",
  summary:
    "ResizeElement draws resize handles and a selection overlay around editable text. The full view installs it with ClickSelect, so a clicked label gets eight handles to drag. The card selects each label in turn from code, and the handles jump from one to the next.",
  section: "Editor",
  tags: ["ResizeElement", "plugins", "selection"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
