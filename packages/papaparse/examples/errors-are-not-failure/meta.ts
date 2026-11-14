// Papa Parse example: parse errors are warnings, the rows still come out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Errors do not mean failure',
  summary:
    'The docs: "Just because errors are generated does not necessarily mean that parsing failed." A messy sign-up sheet still gives every row it could read, with a list of warnings beside it, and you decide what to do with the flagged rows.',
  section: 'Results',
  tags: ['errors', 'ParseError', 'FieldMismatch', 'data'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
