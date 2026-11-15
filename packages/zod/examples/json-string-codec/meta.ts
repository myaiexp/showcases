// Zod example: A JSON string as a typed object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A JSON string as a typed object',
  summary:
    "The json(schema) codec, defined as the docs show, decodes JSON text into an object that must fit a schema, and writes it back with JSON.stringify. Broken JSON becomes a Zod issue of its own, and valid JSON of the wrong shape is caught by the inner schema.",
  section: 'Codecs',
  tags: ['z.codec', 'ctx.issues', 'z.NEVER', 'z.object', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
