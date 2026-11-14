// Zod example: Readonly freezes only the top level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Readonly freezes only the top level',
  summary:
    'A readonly user is frozen, so renaming it fails. But the list of tags inside it is not frozen: adding a tag works. Zod freezes the object it returns, not the objects inside it.',
  section: 'Defaults, catch and more',
  tags: ['readonly', 'Object.freeze', 'z.array'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
