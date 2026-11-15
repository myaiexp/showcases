// Zod example: a default inside an optional field now fills a missing key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Defaults now fill optional fields',
  summary:
    'A settings field written as a default and then optional. Zod 4 fills the default when the key is missing or undefined; Zod 3 left the key out of the result. Switch between the two to see the same three inputs come out differently.',
  section: 'Release notes',
  tags: ['.default()', '.optional()', 'z.object', 'zod/v3'],
  docs: ['repo/packages/docs/content/v4/changelog.mdx', 'repo/packages/docs/content/v4/versioning.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
