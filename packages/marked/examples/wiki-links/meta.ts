// marked example: Wiki links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wiki links",
  summary:
    "[[Page name]] becomes a link, blue when the page exists and red and dashed when nobody has written it yet, like a wiki. [[Page|label]] changes the shown text. A custom inline extension adds the syntax.",
  section: 'Custom extensions',
  tags: ['extensions','inline','tokenizer','renderer'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
