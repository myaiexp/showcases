// Papa Parse example: a quote character other than the double quote
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Single quotes instead of double quotes',
  summary:
    'Some files wrap values in single quotes. Papa only treats double quotes as quotes unless told otherwise, so the commas inside the values split them. Set quoteChar to the apostrophe and they hold together.',
  section: 'Parse config',
  tags: ['quoteChar', 'quotes'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
