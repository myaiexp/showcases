// AntV Infographic example: Custom item: your own props through getItemProps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: your own props through getItemProps',
  summary:
    'TagItem declares three props of its own, accent, radius and uppercase, lists them as the second argument of getItemProps and reads them from the item options under design.item in the syntax. Anything not listed falls through to the outer Group in restProps. The steps change the three options.',
  section: 'Custom items',
  tags: ['registerItem', 'getItemProps', 'design.item options', 'restProps', 'BaseItemProps'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/design.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
