// marked example: Emoji shortcodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Emoji shortcodes",
  summary:
    "Chat-style codes such as :pizza: and :tada: turn into emoji from a small local table; unknown codes and times like 12:30 stay as typed. A custom inline extension does the swap.",
  section: 'Custom extensions',
  tags: ['extensions','inline','start','tokenizer'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
