// Zod example: adding a rule makes a new schema and leaves the original as it was
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Adding a rule makes a new schema',
  summary:
    'Zod schemas are immutable: .min(3) or .max(8) return a new schema and leave the one they were called on unchanged. Three schemas grown from one z.string() judge the same usernames side by side, and the base still accepts everything.',
  section: 'Intro',
  tags: ['immutable', 'z.string', 'min', 'max', 'safeParse'],
  docs: ['repo/packages/docs/content/index.mdx', 'repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
