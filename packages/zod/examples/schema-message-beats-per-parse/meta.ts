// Zod example: Schema messages beat per-parse messages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Schema messages beat per-parse messages',
  summary:
    'A contact schema words its name field itself and leaves email alone. Parsing with a per-parse error map changes only the email message: a message written into the schema has higher priority than the one passed to the parse.',
  section: 'Customizing errors',
  tags: ['safeParse', 'error', 'error precedence', 'per-parse'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
