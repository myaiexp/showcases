// Zod example: the methods Zod Mini keeps: register, brand and clone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The methods Mini keeps',
  summary:
    'Beside parsing and .check(), Zod Mini schemas keep .register(), .brand() and .clone(). Each line runs the method on a live schema and reports what changed: the registry now knows the schema, a brand changes nothing at runtime, and a clone is a new object that judges alike.',
  section: 'Zod Mini',
  tags: ['zod/mini', '.register()', '.brand()', '.clone()', 'z.registry', '_zod.def'],
  docs: ['repo/packages/docs/content/packages/mini.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
