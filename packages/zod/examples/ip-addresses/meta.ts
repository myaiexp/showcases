// Zod example: IPv4 and IPv6
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'IPv4 and IPv6',
  summary:
    'z.ipv4() and z.ipv6() each accept their own address family and reject the other, plus numbers out of range and stray characters. Short IPv6 forms with :: are fine.',
  section: 'Strings and formats',
  tags: ['z.ipv4', 'z.ipv6'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
