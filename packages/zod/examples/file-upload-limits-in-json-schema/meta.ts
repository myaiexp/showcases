// Zod example: z.file() and its limits as JSON Schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Files in JSON Schema',
  summary:
    'z.file() becomes the "binary" string OpenAPI uses for uploads; a size limit becomes maxLength and a mime type becomes contentMediaType.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.file', '.max()', '.mime()'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
