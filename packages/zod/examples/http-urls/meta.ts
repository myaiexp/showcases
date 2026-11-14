// Zod example: Web links only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Web links only',
  summary:
    'z.httpUrl() is z.url() limited to http and https with a real domain name. It turns away mailto and ftp links, javascript: links, localhost and bare IP addresses that z.url() lets through.',
  section: 'Strings and formats',
  tags: ['z.httpUrl', 'z.url'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
