// Zod example: Records with numeric keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Records with numeric keys',
  summary:
    'Object keys are always text, but a number schema as the key means the key must look like a number: "1", "1.5" and "-3" pass, "abc" does not. An int schema with min, max and step narrows the allowed keys further.',
  section: 'Records, maps, sets and more',
  tags: ['z.record', 'z.number', 'z.int', 'step', 'invalid_key'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
