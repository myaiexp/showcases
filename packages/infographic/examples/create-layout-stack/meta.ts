// AntV Infographic example: createLayout: a vertical Stack from the docs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'createLayout: a vertical Stack from the docs',
  summary:
    'createLayout wraps a function that receives the children and your own props and returns the repositioned tree. Stack measures each child with getElementBounds, moves it down with cloneElement, and adds a gap prop; the steps render the same three cards with gap 4, 16 and 32.',
  section: 'Create layout',
  tags: ['createLayout', 'getElementBounds', 'cloneElement', 'Group', 'gap'],
  docs: [
    'repo/site/src/content/reference/create-layout.en.md',
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
