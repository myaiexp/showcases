// vchart example: Rich text in a label
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rich text in a label",
  summary:
    "A bar label's formatMethod returns {type: 'rich', text: [...]}: an SVG badge image, an underlined day name, and the value in bold italics, each paragraph with its own style. updateData keeps the numbers changing.",
  section: 'Custom Extension',
  tags: ['label.formatMethod', 'type rich', 'text', 'image', 'fontWeight', 'underline'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/Richtext_and_Dom.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
