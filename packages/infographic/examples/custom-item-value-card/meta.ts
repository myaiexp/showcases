// AntV Infographic example: Custom item: a value card
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: a value card',
  summary:
    'ValueCard is an item written in JSX from a Rect, an ItemLabel and an ItemValue. It sizes its card from the content, and draws the value only when datum.value is a number, as the skill reference asks. Registered as showcase-value-card; one step leaves a value out.',
  section: 'Custom items',
  tags: ['registerItem', 'ItemValue', 'ItemLabel', 'getItemProps', 'datum.value', 'themeColors'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/skills/infographic-item-creator/SKILL.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
