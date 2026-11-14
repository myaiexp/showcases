// Zod example: What kind of text is this?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What kind of text is this?',
  summary:
    'One string, a dozen format schemas at once. Each sample lights up the formats that accept it, and some strings fit several: "deadBEEF" is valid hex and also valid base64.',
  section: 'Strings and formats',
  tags: ['z.email', 'z.uuid', 'z.url', 'z.ipv4', 'z.base64', 'z.hex', 'z.nanoid', 'z.ulid', 'z.emoji'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
