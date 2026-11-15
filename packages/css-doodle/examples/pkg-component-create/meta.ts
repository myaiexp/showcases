// css-doodle/component create(): new doodle elements from code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Elements from code with create()',
  summary:
    'create(code) from css-doodle/component registers <css-doodle> if needed and returns a new element with the code as its content, ready to append. The example creates a doodle every second or so, each with its own palette, and keeps the last few.',
  section: 'Package exports',
  tags: ['css-doodle/component', 'create()'],
  docs: ['pages/css-doodle-com/reference/js-api-modules.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
