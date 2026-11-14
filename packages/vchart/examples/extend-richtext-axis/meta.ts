// vchart example: Rich text in axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rich text in axis labels",
  summary:
    "The left axis label's formatMethod turns each category into a rich paragraph pair: a coloured rank badge image followed by the name in bold italics. Rankings are reshuffled with updateData and the badges follow their names.",
  section: 'Custom Extension',
  tags: ['axes.label.formatMethod', 'type rich', 'image', 'fontStyle', 'padding'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/Richtext_and_Dom.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
