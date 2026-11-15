// Zod example: A transform only goes one way
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A transform only goes one way',
  summary:
    "Run a .transform() backwards and Zod throws an ordinary Error instead of returning issues, because the function cannot be undone. A codec with an encode function is the way to make the trip both ways.",
  section: 'Codecs',
  tags: ['.transform', 'z.codec', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
