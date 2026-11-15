// AntV Infographic example: Custom item: a bar whose length is the value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: a bar whose length is the value',
  summary:
    'BarItem turns datum.value (0 to 100) into the width of a Rect on a track, with the number shown by ItemValue and a clamp so odd data cannot overflow the card. Registered as showcase-bar-item and used in a list-column; the steps change the values.',
  section: 'Custom items',
  tags: ['registerItem', 'ItemValue', 'datum.value', 'Rect', 'list-column'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
