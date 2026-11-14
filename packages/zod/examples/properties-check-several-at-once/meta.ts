// Zod example: Check several properties at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check several properties at once',
  summary:
    'z.properties({...}) spreads into .check() to test many properties of a URL in one go: https only, no port number, and a hostname under example.com. Each failing property gets its own issue, pinned to its name.',
  section: 'Records, maps, sets and more',
  tags: ['z.properties', 'z.instanceof', 'check'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
