// Zod example: string formats and the keywords they become
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'String formats in JSON Schema',
  summary:
    'Email, url, uuid, dates, durations, IP addresses, base64 and more, each shown with the keywords it becomes: a format name, a pattern, and for base64 a contentEncoding.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.email', 'z.uuid', 'z.iso.datetime', 'z.base64'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
