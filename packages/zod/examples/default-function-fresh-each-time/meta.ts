// Zod example: A default that is new every parse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A default that is new every parse',
  summary:
    'Two schemas fill in a missing order id: one with a fixed default and one with a function. The fixed default gives every order the same id. The function is called on each parse and gives each order its own.',
  section: 'Defaults, catch and more',
  tags: ['default', 'function default'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
