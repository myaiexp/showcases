// AntV Infographic example: createLayout: the built-in AlignLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'createLayout: the built-in AlignLayout',
  summary:
    'AlignLayout aligns a group of children to the left, centre or right and the top, middle or bottom of a container. Without a width and height it measures the children, so here a wide bar, a short label and a small square share one frame; the steps change horizontal and vertical.',
  section: 'Create layout',
  tags: ['AlignLayout', 'horizontal', 'vertical', 'createLayout', 'getElementBounds'],
  docs: [
    'repo/site/src/content/reference/create-layout.en.md',
    'repo/site/src/content/reference/jsx-utils.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
