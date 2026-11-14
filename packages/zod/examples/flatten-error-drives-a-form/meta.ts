// Zod example: A form fed by flattenError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A form fed by flattenError',
  summary:
    'z.flattenError returns formErrors for problems with the whole form and fieldErrors with a list per field. A sign-up form is filled in and each box and the banner read their own part, checked on every keystroke.',
  section: 'Formatting errors',
  tags: ['z.flattenError', 'formErrors', 'fieldErrors', 'refine', 'forms'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
