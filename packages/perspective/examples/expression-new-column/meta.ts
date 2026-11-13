// Perspective example: expression columns with validate_expressions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Expression columns',
  summary:
    'expressions maps a new column name to an ExprTK expression over existing columns. Edit the expression and see table.validate_expressions report the inferred type, or the error, before it is applied.',
  section: 'Expressions',
  tags: ['expressions', 'validate_expressions', 'arithmetic', 'type error'],
  docs: ['repo/docs/md/explanation/view/config/expressions.md', 'repo/docs/md/explanation/view/advanced.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
