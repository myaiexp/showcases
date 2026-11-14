// Papa Parse example: fast mode assumes there are no quoted fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fast mode and quoted fields',
  summary:
    'Fast mode is quick because it just cuts at every comma and line break, so it cannot handle quotes. Left unset, Papa turns it on only when the text has no quote marks. Force it on for quoted text and the result breaks.',
  section: 'Parse config',
  tags: ['fastMode', 'quotes'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
