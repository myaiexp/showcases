// vega example: Usage: Parse AST
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Usage: Expression ASTs for the Interpreter',
  summary:
    'vega.parse with the ast option keeps each expression\'s syntax tree next to its generated JavaScript; the example draws that tree for four expressions, the input a CSP-friendly interpreter would walk instead of calling the Function constructor.',
  section: 'Usage',
  tags: ['parser.ast', 'view.expr', 'usage.csp'],
  docs: ['repo/docs/usage/interpreter.md', 'repo/docs/usage/index.md', 'repo/docs/docs/api/parser.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
