// Zod example: z.stringbool default truthy and falsy words
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which words mean yes or no',
  summary:
    "Environment variables and query strings spell booleans as text. z.stringbool() turns the words true, 1, yes, on, y and enabled into true, and false, 0, no, off, n and disabled into false, in any capitalisation. Anything else is rejected, never guessed.",
  section: 'Numbers, dates and enums',
  tags: ['z.stringbool'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
