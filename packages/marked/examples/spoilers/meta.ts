// marked example: Click-to-reveal spoilers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Click-to-reveal spoilers",
  summary:
    "Text between double bars hides behind a dark bar until you click it, like on a forum. A custom inline extension writes the buttons; a click listener on the page does the revealing.",
  section: 'Custom extensions',
  tags: ['extensions','inline','start','tokenizer','spoiler'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
