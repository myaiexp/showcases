// Zod example: Is this a JWT?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Is this a JWT?',
  summary:
    'z.jwt() accepts text shaped like a JSON Web Token: a header, a payload and a signature joined by dots. Pass alg to demand a signing algorithm. It does not check the signature.',
  section: 'Strings and formats',
  tags: ['z.jwt', 'alg'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
