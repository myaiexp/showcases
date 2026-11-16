// fabric example: Subclassing: LabeledRect extends Rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: LabeledRect extends Rect',
  summary:
    'The guide LabeledRect in version 7 style: a class extending Rect with static type, cacheProperties and getDefaults, a _render that draws the label after the rectangle and a toObject that saves it.',
  section: 'Subclassing',
  tags: ['Rect', 'extends', '_render', 'toObject', 'cacheProperties', 'getDefaults', 'classRegistry'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Rect.md',
    'repo/src/content/docs/api/variables/classRegistry.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
