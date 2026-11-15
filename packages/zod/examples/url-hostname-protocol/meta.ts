// Zod example: Limit a URLs host and scheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Limit a URL\'s host and scheme',
  summary:
    'z.url() accepts two regular expressions: hostname pins which sites are allowed, protocol which scheme. Pick one and see the same web addresses sorted differently.',
  section: 'Strings and formats',
  tags: ['z.url', 'hostname', 'protocol'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
