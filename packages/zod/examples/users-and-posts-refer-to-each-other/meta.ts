// Zod example: two schemas referring to each other through getters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Users and posts that refer to each other",
  summary:
    "A user has posts and each post has an author, who is a user. Two schemas can point at each other through getters, so one nested record is checked from both ends and the issue path shows which hop went wrong.",
  section: 'Objects',
  tags: ['z.object', 'getter', 'z.array', 'z.email', 'mutually recursive'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
