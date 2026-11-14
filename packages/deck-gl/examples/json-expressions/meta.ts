// deck-gl example: JSON: @@= Accessor Expressions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSON: @@= Accessor Expressions',
  summary:
    'Strings starting with @@= become accessor functions: array literals, arithmetic and inline conditionals over the row fields, swapped from selects with the expression shown as written in the JSON.',
  section: 'JSON',
  tags: ['JSONConverter', '@@=', 'accessor', 'expression'],
  docs: [
    'repo/docs/api-reference/json/conversion-reference.md',
    'repo/docs/api-reference/json/json-converter.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
