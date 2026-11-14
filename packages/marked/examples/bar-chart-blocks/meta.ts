// marked example: Bar chart blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bar chart blocks",
  summary:
    "A :::chart block with \"label: number\" lines is drawn as a horizontal bar chart, scaled to the biggest value. A block extension reads the rows and writes the HTML itself.",
  section: 'Custom extensions',
  tags: ['extensions','block','chart','tokenizer'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
