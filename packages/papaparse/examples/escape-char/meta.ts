// Papa Parse example: backslash-escaped quotes inside quoted values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quotes escaped with a backslash',
  summary:
    'CSV normally writes a quote inside a quoted value by doubling it (""). Some programs write \\" instead. Tell Papa with escapeChar and the quote stays in the value instead of ending it early.',
  section: 'Parse config',
  tags: ['escapeChar', 'quoteChar', 'InvalidQuotes'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
