// Papa Parse example: checking an uploaded CSV and listing every problem by line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check an upload and list every problem',
  summary:
    '"Malformed CSV is handled gracefully with a detailed error report." Open a file or paste text and Papa reads all of it, then every problem is listed by line with a pass or fail badge: the checker you would put behind an upload button.',
  section: 'Results',
  tags: ['errors', 'ParseError', 'FieldMismatch', 'header', 'skipEmptyLines', 'file input'],
  docs: ['repo/docs/index.html', 'repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
