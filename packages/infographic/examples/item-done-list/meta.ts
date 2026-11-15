// AntV Infographic example: Item: DoneList
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Item: DoneList",
  summary:
    "The DoneList item (id done-list) is a check mark in front of a title, like a finished task, placed in a list-column structure with a design block. The 4 steps change width, height, iconSize, gap and positionH under the item line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in items",
  tags: ['done-list', 'design', 'width', 'height', 'iconSize', 'gap', 'positionH'],
  docs: [
    'repo/site/src/content/reference/built-in-items.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
