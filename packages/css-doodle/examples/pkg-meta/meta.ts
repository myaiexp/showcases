// css-doodle/meta: the names the language knows, for editors and tooling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The names the language knows',
  summary:
    'css-doodle/meta exports lists for editors and tooling: every function name with its aliases and dot variants (such as the @tile forms), the Math members usable as functions, the cell selectors, the @ properties, and the expression operators with their precedence. The example prints each list straight from the module.',
  section: 'Package exports',
  tags: ['css-doodle/meta', 'functions', 'selectors', 'properties', 'calcOperators'],
  docs: ['pages/css-doodle-com/reference/js-api-modules.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
