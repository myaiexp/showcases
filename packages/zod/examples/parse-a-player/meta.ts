// Zod example: a schema checks player data and names every wrong field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check data against a schema',
  summary:
    'A Player schema says a player has a username (text) and xp (a number). Good data comes back as a clean copy; data with a number where text belongs, or a missing field, comes back rejected with one issue per wrong field, each naming where it is.',
  section: 'Basic usage',
  tags: ['z.object', 'safeParse', 'issues', 'path'],
  docs: ['repo/packages/docs/content/basics.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
