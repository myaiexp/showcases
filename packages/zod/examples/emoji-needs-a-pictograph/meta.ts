// Zod example: z.emoji() needs a real pictograph, not just digits or joiners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An emoji needs a real picture',
  summary:
    'Digits, # and * are technically emoji components, so z.emoji() used to accept the text "123". Since 4.6 it needs at least one pictograph, flag or keycap. The rows show what passes: faces, flags and keycaps do, plain digits and symbols do not.',
  section: 'Release notes',
  tags: ['z.emoji', 'keycap', 'flags'],
  docs: ['repo/packages/docs/content/blog/zod-4-6.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
