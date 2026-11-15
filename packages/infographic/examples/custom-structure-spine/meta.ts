// AntV Infographic example: Custom structure: positionH on either side of a spine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: positionH on either side of a spine',
  summary:
    'Spine hangs the items alternately to the right and left of a vertical line. The right ones are drawn with positionH normal and the left with flipped, which mirrors the item design so the text always faces the line. Registered as showcase-spine; the step changes the number of items.',
  section: 'Custom structures',
  tags: ['registerStructure', 'positionH', 'normal', 'flipped', 'Rect', 'Ellipse'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
