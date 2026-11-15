// Zod example: .isOptional() and .isNullable() on wrapped schemas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Asking a schema if it takes undefined or null',
  summary:
    'Every Zod schema can answer .isOptional() and .isNullable(). The rows ask it of plain, optional, nullable, defaulted and catch-all schemas, with a real parse of undefined and null beside each answer so the two always agree.',
  section: 'Zod Mini',
  tags: ['.isOptional()', '.isNullable()', '.optional()', '.nullable()', '.default()', '.catch()', 'z.unknown'],
  docs: ['repo/packages/docs/content/packages/zod.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
