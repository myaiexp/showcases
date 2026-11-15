// Zod example: metadata replaces keywords Zod generated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Metadata wins over generated keywords',
  summary:
    'Metadata is applied last: a type you put in .meta() replaces the one Zod worked out, and it can supply the description of a Date that Zod cannot describe by itself.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', '.meta()', 'unrepresentable', 'z.date'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
