// ky example: absolute inputs bypass baseUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Full addresses skip the baseUrl',
  summary:
    'A baseUrl is a default home for short addresses, but sometimes you hold a complete one, such as a "next page" link a server sent back. Ky leaves a complete address (https://…) alone and sends it exactly as written, while a scheme-less //host address is still treated as relative and picks up https from the base.',
  section: 'URLs',
  tags: ['baseUrl', 'absolute URL', 'protocol-relative', 'pagination'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
