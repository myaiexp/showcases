// Zod example: Which kind of UUID?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which kind of UUID?',
  summary:
    'z.uuid() accepts any standard UUID; pass a version, or use z.uuidv4() and friends, to demand one kind. z.guid() is the loose cousin that accepts anything UUID-shaped.',
  section: 'Strings and formats',
  tags: ['z.uuid', 'z.uuidv4', 'z.uuidv7', 'z.guid'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
