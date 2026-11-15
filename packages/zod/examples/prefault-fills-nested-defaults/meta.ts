// Zod example: Prefault an empty object to fill nested defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prefault an empty object to fill nested defaults',
  summary:
    'A database config gives each field a default. A missing config with .default({}) comes back empty, since the default is not parsed. With .prefault({}) the empty object goes through the schema, so every field gets its own default.',
  section: 'Defaults, catch and more',
  tags: ['prefault', 'default', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
