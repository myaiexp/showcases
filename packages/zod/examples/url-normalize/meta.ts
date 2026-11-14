// Zod example: Tidy a URL while checking it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tidy a URL while checking it',
  summary:
    'With normalize: true, z.url() hands back the URL as the browser would write it: scheme and host in lower case, dot segments resolved, spaces escaped, a slash added. The output marks the changed text.',
  section: 'Strings and formats',
  tags: ['z.url', 'normalize'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
