// vchart example: Rich text in an indicator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rich text in an indicator",
  summary:
    "The indicator in a donut's hole shows rich text: its title style.text callback returns paragraphs with a bold label and an italic underlined name. The card follows the selected slice, which the example moves with setSelected.",
  section: 'Custom Extension',
  tags: ['indicator.title.style.text', 'type rich', 'trigger select', 'setSelected'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/Richtext_and_Dom.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
