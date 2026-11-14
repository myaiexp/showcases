// Zod example: an own __proto__ key in JSON is dropped or reported
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A planted __proto__ key is dropped',
  summary:
    'JSON text can carry a key literally named __proto__, a classic way to smuggle in fields like isAdmin. Zod always strips that key from the result of an object schema, and a strict object reports it as an unrecognized key.',
  section: 'Release notes',
  tags: ['__proto__', 'z.object', 'z.strictObject', 'unrecognized_keys', 'JSON.parse'],
  docs: ['repo/packages/docs/content/blog/zod-4-5.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
