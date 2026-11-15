// Zod example: One error map for every schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One error map for every schema',
  summary:
    'z.config({ customError }) words failures for every schema at once, below schema-level and per-parse messages. The card sets it, parses and puts the old config back immediately, so other cards on the page are never affected.',
  section: 'Customizing errors',
  tags: ['z.config', 'customError', 'issues', 'error map'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
