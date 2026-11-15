// AntV Infographic example: Item: PlainText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Item: PlainText",
  summary:
    "The PlainText item (id plain-text) is bare text whose alignment follows positionH, placed in a list-column structure with a design block. The 4 steps change width, positionH and usePaletteColor under the item line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in items",
  tags: ['plain-text', 'design', 'width', 'positionH', 'usePaletteColor'],
  docs: [
    'repo/site/src/content/reference/built-in-items.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
