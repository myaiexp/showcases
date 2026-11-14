// Zod example: A default is not checked
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A default is not checked',
  summary:
    'A schema asks for text of at least 5 characters, with a default of "ab". Leaving the value out gives "ab" even though it is too short, because a default is handed back as it is. A value that is given still goes through the rules.',
  section: 'Defaults, catch and more',
  tags: ['default', 'min'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
