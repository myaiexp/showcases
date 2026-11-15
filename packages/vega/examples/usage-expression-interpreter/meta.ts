// vega example: Usage: the CSP-safe expression interpreter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Usage: the CSP-safe expression interpreter',
  summary:
    'The docs\' three steps: vega-interpreter loaded, vega.parse with {ast: true}, and the View given expr: expressionInterpreter. A wave driven by signal, formula, encode and handler expressions runs with no generated code; the full view counts what the interpreter evaluated.',
  section: 'Usage',
  tags: ['vega-interpreter', 'parse.ast', 'view.expr', 'csp'],
  docs: ['repo/docs/usage/interpreter.md', 'repo/docs/docs/api/view.md', 'repo/docs/docs/api/parser.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
