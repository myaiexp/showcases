// Zod example: exclude() and extract() derive smaller enums
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smaller enums from a bigger one',
  summary:
    "An app has four roles. .exclude() makes a new enum without some of them (the roles anyone may pick when signing up), .extract() makes one with only some (the staff roles). The original stays untouched, and each new schema accepts exactly its own list.",
  section: 'Numbers, dates and enums',
  tags: ['z.enum', 'exclude', 'extract', 'enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
