// AntV Infographic example: Custom item: shapes the theme stylize can redraw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: shapes the theme stylize can redraw',
  summary:
    'ShapeCard builds its body from Rect and Ellipse inside a ShapesGroup, the one wrapper whose children the renderer may restyle, while its text stays plain. The steps apply no stylize, then rough, then a pattern fill to the same item.',
  section: 'Custom items',
  tags: ['registerItem', 'ShapesGroup', 'data-element-type', 'stylize', 'rough', 'pattern'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
