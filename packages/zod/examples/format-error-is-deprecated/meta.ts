// Zod example: formatError, the deprecated tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'formatError, the deprecated tree',
  summary:
    'The docs mark z.formatError as deprecated in favour of z.treeifyError. Both are drawn for the same failing data: the messages are the same, but formatError hides them under _errors at every level.',
  section: 'Formatting errors',
  tags: ['z.formatError', 'z.treeifyError', 'deprecated', '_errors'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
