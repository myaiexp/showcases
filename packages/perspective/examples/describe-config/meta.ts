// Perspective example: describe() and validate_expressions()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Describing a view config',
  summary:
    'table.describe(config) says what a View would look like, or why it could not be built, without creating one: a view_schema, per-expression errors with line and column, or a config_error. Edit the JSON and see each verdict, next to validate_expressions().',
  section: 'Advanced View',
  tags: ['describe', 'validate_expressions', 'expressions', 'view_schema', 'config_error'],
  docs: ['repo/docs/md/explanation/view/advanced.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
