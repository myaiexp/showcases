// vchart example: Rich text in a custom mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rich text in a custom mark",
  summary:
    "A customMark of type text can take rich text as its text: a percentage change with a coloured arrow image and a grey second line, placed over each bar. The mark's data, position and visibility are callbacks, so it follows updateData.",
  section: 'Custom Extension',
  tags: ['customMark', 'type text', 'style.text', 'type rich', 'image', 'dataId'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/Richtext_and_Dom.md',
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
