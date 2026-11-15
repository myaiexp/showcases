// AntV Infographic example: JSX utilities: getElementsBounds over several nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX utilities: getElementsBounds over several nodes',
  summary:
    'getElementsBounds takes several nodes (or an array) and returns the bounds that contain them all. The steps add one more shape to the list each time; the red outline is the union and the panel prints its numbers, so you can watch it grow to cover the new shape.',
  section: 'JSX utilities',
  tags: ['getElementsBounds', 'Bounds', 'union', 'array of nodes'],
  docs: [
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
