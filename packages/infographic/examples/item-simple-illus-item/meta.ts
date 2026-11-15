// AntV Infographic example: Item: SimpleIllusItem
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Item: SimpleIllusItem",
  summary:
    "The SimpleIllusItem item (id simple-illus) is an illustration with a centred title and description, placed in a list-row structure with a design block. The 4 steps change width, usePaletteColor, illusSize and gap under the item line, so you see what each prop does. The full view prints the syntax being rendered.",
  section: "Built-in items",
  tags: ['simple-illus', 'design', 'width', 'usePaletteColor', 'illusSize', 'gap'],
  docs: [
    'repo/site/src/content/reference/built-in-items.en.md',
    'repo/site/src/content/learn/design.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
