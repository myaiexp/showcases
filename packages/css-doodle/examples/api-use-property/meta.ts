// The use property: read or set the use attribute from JavaScript
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The use property',
  summary:
    'Rules for the cells live in custom properties on the page (--rule-dots, --rule-bars, --rule-leaves), each wrapped in parentheses so its semicolons make a valid value. The doodle\'s own code only sets the grid, and setting doodle.use = \'var(--rule-bars)\' writes the use attribute and re-renders with those rules.',
  section: 'Element API',
  tags: ['use', 'var()', 'custom properties'],
  docs: ['pages/css-doodle-com/reference/js-api-use.md', 'pages/css-doodle-com/reference/attribute-use.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
