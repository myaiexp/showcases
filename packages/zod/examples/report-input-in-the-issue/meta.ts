// Zod example: Putting the rejected value in the issue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Putting the rejected value in the issue',
  summary:
    'Zod leaves the input out of issues on purpose, so a password never ends up in a log by accident. Passing reportInput: true adds an input field; the two issue objects are drawn side by side.',
  section: 'Customizing errors',
  tags: ['reportInput', 'safeParse', 'issues', 'z.string'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
