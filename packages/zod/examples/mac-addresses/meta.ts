// Zod example: MAC addresses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MAC addresses',
  summary:
    'z.mac() accepts a 48-bit hardware address written with colons; the delimiter option switches to dashes. Mixed upper and lower case in one address is rejected.',
  section: 'Strings and formats',
  tags: ['z.mac', 'delimiter'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
