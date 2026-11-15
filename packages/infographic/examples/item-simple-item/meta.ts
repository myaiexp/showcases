// AntV Infographic example: Item: SimpleItem
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Item: SimpleItem",
  summary:
    "The SimpleItem item (id simple) is the common list item: icon, title and description, placed in a list-grid structure with a design block. The 5 steps change width, showIcon, iconType, iconSize, usePaletteColor and positionH under the item line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in items",
  tags: ['simple', 'design', 'width', 'showIcon', 'iconType', 'iconSize', 'usePaletteColor', 'positionH'],
  docs: [
    'repo/site/src/content/reference/built-in-items.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
