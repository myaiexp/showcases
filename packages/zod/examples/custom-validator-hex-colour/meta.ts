// Zod example: z.custom() for a type of your own
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.custom() for a type of your own',
  summary:
    'Zod has no schema for a hex colour such as #ff8800, so z.custom() takes a small function that says yes or no, plus the message to show. Type or pick a colour: good ones pass unchanged, and the rest are rejected with your message.',
  section: 'Defaults, catch and more',
  tags: ['z.custom'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
