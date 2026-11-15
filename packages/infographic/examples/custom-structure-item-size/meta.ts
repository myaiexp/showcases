// AntV Infographic example: Custom structure: handing width and height to every item
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: handing width and height to every item',
  summary:
    'Cells passes a width and a height to each item it places, because some items (here circle-node) size themselves from those props. The structure’s own size prop is the one number the syntax changes: 90, 130 and 170 redraw the same circles at three sizes and the layout follows the measured result.',
  section: 'Custom structures',
  tags: ['registerStructure', 'Item props', 'width', 'height', 'circle-node', 'getElementBounds'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
