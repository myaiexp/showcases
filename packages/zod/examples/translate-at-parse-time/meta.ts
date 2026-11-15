// Zod example: Words chosen at parse time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Words chosen at parse time',
  summary:
    'An error function runs when a parse fails, not when the schema is built. One schema made once answers in a different language each time the language variable changes, parse after parse.',
  section: 'Customizing errors',
  tags: ['error function', 'iss.code', 'translation', 'safeParse'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
