// AntV Infographic example: Editor commands: UpdateTextCommand and BatchCommand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor commands: UpdateTextCommand and BatchCommand",
  summary:
    "A plugin receives the editor's commander, which runs commands and keeps the undo history. Buttons in the full view send an UpdateTextCommand for one label and a BatchCommand that rewrites all three at once, and undo or redo them. The card runs the batch, undoes it and redoes it in a loop.",
  section: "Editor",
  tags: ["UpdateTextCommand", "BatchCommand", "commander", "ICommand"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
