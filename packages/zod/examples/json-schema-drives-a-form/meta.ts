// Zod example: a form built from the JSON Schema Zod wrote
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A form drawn from JSON Schema',
  summary:
    'A form is built from nothing but the JSON Schema a Zod schema writes: titles become labels, required fields get a star, enums become menus, limits become hints. Typing in the form is still checked by Zod.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'io', '.meta()', 'z.enum', 'z.int'],
  docs: ['repo/packages/docs/content/json-schema.mdx', 'repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
