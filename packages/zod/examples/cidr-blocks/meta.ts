// Zod example: Network ranges (CIDR)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Network ranges (CIDR)',
  summary:
    'A network range is an address plus a prefix length, like 10.0.0.0/8. z.cidrv4() and z.cidrv6() check the address and that the length fits (up to 32 or 128 bits).',
  section: 'Strings and formats',
  tags: ['z.cidrv4', 'z.cidrv6'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
