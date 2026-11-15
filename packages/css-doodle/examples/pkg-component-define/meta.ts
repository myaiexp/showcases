// css-doodle/component: the element class, registered under a custom tag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom tag with define()',
  summary:
    'css-doodle/component exports the element class without registering it. define(\'showcase-doodle\', class extends CSSDoodle {}) registers a subclass under a tag of your own, unless the name is taken; the new tag reads its code and draws exactly like <css-doodle>.',
  section: 'Package exports',
  tags: ['css-doodle/component', 'CSSDoodle', 'define()', 'custom elements'],
  docs: ['pages/css-doodle-com/reference/js-api-modules.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
