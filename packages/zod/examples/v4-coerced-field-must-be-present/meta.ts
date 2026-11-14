// Zod example: a missing key under z.coerce now fails unless a default is given
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A missing coerced field is an error now',
  summary:
    'A newsletter flag read with z.coerce.boolean(). When the key is absent, Zod 3 quietly made it false; Zod 4 reports it as missing. Adding .default(false) states the fallback on purpose and brings the old result back.',
  section: 'Release notes',
  tags: ['z.coerce.boolean', '.default()', 'z.object', 'zod/v3'],
  docs: ['repo/packages/docs/content/v4/changelog.mdx', 'repo/packages/docs/content/v4/versioning.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
