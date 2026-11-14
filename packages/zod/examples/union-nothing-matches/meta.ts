// Zod example: Union: why nothing matched
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Union: why nothing matched',
  summary:
    'A contact field accepts an email or a phone number. When the text is neither, Zod reports one issue that carries a list of reasons per option, so you can see why each option said no. Matching text stops at the first option that fits.',
  section: 'Arrays, tuples and unions',
  tags: ['z.union', 'z.email', 'z.e164', 'invalid_union', 'errors'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
