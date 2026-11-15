// l7 example: Hover and click highlight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover and click highlight',
  summary:
    'active({ color, mix }) tints the polygon under the pointer and select({ color }) keeps the clicked one highlighted. mix blends the highlight with the element\'s own colour.',
  section: 'Tutorial: Interaction',
  tags: ['active', 'select', 'mix', 'click'],
  docs: ['repo/site/docs/tutorial/interactive/hightlight.en.md', 'repo/site/docs/api/common/layer/layer_interaction.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
