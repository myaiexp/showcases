// Zod example: Is this a hostname?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Is this a hostname?',
  summary:
    'z.hostname() accepts a bare host name such as sub.example.com: no scheme, no port, no underscores, no edge hyphens. Type one and see what trips it.',
  section: 'Strings and formats',
  tags: ['z.hostname'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
