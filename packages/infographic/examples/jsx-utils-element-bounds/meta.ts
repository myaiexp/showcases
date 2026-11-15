// AntV Infographic example: JSX utilities: getElementBounds of different nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX utilities: getElementBounds of different nodes',
  summary:
    'getElementBounds measures any JSX node: a primitive with a size, a group by its children, or a function component by rendering it. Each step draws a node with a dashed outline built from its own measured bounds, and the panel prints the numbers that came back.',
  section: 'JSX utilities',
  tags: ['getElementBounds', 'Bounds', 'Group', 'function component', 'measure'],
  docs: [
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
