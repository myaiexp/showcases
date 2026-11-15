// AntV Infographic example: createLayout: a Radial layout that centres children on a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'createLayout: a Radial layout that centres children on a circle',
  summary:
    'A second custom layout: Radial reads each child’s bounds, centres it on a point of a circle with cloneElement and draws the circle behind. The steps change the radius prop and the number of children, and the layout adapts because it only uses measured sizes.',
  section: 'Create layout',
  tags: ['createLayout', 'cloneElement', 'getElementBounds', 'Ellipse', 'radius'],
  docs: [
    'repo/site/src/content/reference/create-layout.en.md',
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/primitive-nodes.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
