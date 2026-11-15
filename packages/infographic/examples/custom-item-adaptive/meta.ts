// AntV Infographic example: Custom item: layout that closes up over missing fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: layout that closes up over missing fields',
  summary:
    'AdaptiveCard supports icon, label, desc and value, all optional, and stacks only the ones present in a FlexLayout so nothing leaves a hole; the card height is measured from what remains. The steps strip the data fields one by one, which is the "completeness" requirement of the item guide.',
  section: 'Custom items',
  tags: ['registerItem', 'FlexLayout', 'getElementBounds', 'ItemIcon', 'ItemDesc', 'optional fields'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/skills/infographic-item-creator/SKILL.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
