// Zod example: What an issue looks like
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What an issue looks like',
  summary:
    'Every failure is an issue object with a code, a path and a message, plus fields that depend on the kind of failure: expected, minimum, maximum, values, keys, divisor. Eight kinds are drawn field by field.',
  section: 'Customizing errors',
  tags: ['issues', 'iss.code', 'path', 'message', 'invalid_type', 'too_small'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
