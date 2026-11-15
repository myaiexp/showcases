// Zod example: Link text to URL objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link text to URL objects',
  summary:
    "stringToURL and stringToHttpURL (defined as the docs show) turn link text into URL objects and back with href. The http version also refuses other schemes such as ftp, and href can add a trailing slash the original text did not have.",
  section: 'Codecs',
  tags: ['z.codec', 'z.url', 'z.httpUrl', 'z.instanceof', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
