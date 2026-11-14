// Zod example: A message that counts for you
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A message that counts for you',
  summary:
    'The error function receives the issue, so a too-short message can quote the limit and how many characters have been typed. Type a password and watch the message count down.',
  section: 'Customizing errors',
  tags: ['error function', 'iss.minimum', 'iss.input', 'min', 'typing'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
