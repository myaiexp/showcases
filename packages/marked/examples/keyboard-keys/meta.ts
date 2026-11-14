// marked example: Keyboard key caps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Keyboard key caps",
  summary:
    "Write {{Ctrl}}+{{C}} in help text and each key is drawn as a raised key cap; a switch swaps in Mac symbols. A custom inline extension adds the syntax.",
  section: 'Custom extensions',
  tags: ['extensions','inline','kbd','tokenizer'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
