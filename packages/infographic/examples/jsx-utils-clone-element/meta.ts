// AntV Infographic example: JSX utilities: cloneElement overrides props, original untouched
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX utilities: cloneElement overrides props, original untouched',
  summary:
    'cloneElement(element, props) returns a shallow copy with the given props merged over the old ones, so one Badge element can be placed again with a new x, fill or opacity. Each step draws the original and its clones; the original element is never changed.',
  section: 'JSX utilities',
  tags: ['cloneElement', 'JSXElement', 'props', 'shallow merge'],
  docs: [
    'repo/site/src/content/reference/jsx-utils.en.md',
    'repo/site/src/content/reference/create-layout.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
