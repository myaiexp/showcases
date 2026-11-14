// vchart example: Rich text in a discrete legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rich text in a discrete legend",
  summary:
    "A pie's legend items carry a value through legends.data, and legends.item.value.formatMethod renders it as rich text: the number, then a green or red percentage depending on the sign of the change. The values refresh with updateData.",
  section: 'Custom Extension',
  tags: ['legends.item.value.formatMethod', 'legends.data', 'type rich', 'alignRight', 'autoPage'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/Richtext_and_Dom.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
