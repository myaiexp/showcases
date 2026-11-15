// d2 example: Strings: block string autoformat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Strings: block string autoformat',
  summary:
    'A block string (`|go ... |`) pasted at column one with too little indentation is re-indented by the formatter. The first tab is the pasted form, the second the indented source it becomes; both compile to the same code block.',
  section: 'Strings',
  tags: ['strings', 'block string', 'code'],
  docs: ['repo/docs/tour/strings.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
