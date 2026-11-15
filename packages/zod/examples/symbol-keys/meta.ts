// Zod example: a symbol-keyed field is validated; undeclared symbols are ignored
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol keys in a shape",
  summary:
    "A shape may use a symbol as a key, and its value is checked like any other. A symbol the shape never declares is ignored: even z.looseObject() will not carry it into the result.",
  section: 'Objects',
  tags: ['z.object', 'z.looseObject', 'Symbol'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
