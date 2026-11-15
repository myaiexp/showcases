// Zod example: Different words for each kind of failure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Different words for each kind of failure',
  summary:
    'The error option can be a function that looks at the issue. Here a missing password, a password of the wrong type and a too-short password each get their own sentence, and the issue code is shown beside each.',
  section: 'Customizing errors',
  tags: ['error function', 'iss.code', 'iss.input', 'invalid_type', 'too_small'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
