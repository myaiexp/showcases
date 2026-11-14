// Zod example: A dictionary with any keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A dictionary with any keys',
  summary:
    'z.record(z.string(), z.string()) checks an object used as a dictionary: any keys are fine, but every value must be text. The issue for a wrong value is pinned to its key, so a lookup table of user ids to avatar links shows exactly which entry is broken.',
  section: 'Records, maps, sets and more',
  tags: ['z.record', 'issues', 'path'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
