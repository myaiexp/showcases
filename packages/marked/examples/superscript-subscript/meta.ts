// marked example: Superscript and subscript
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Superscript and subscript",
  summary:
    "H~2~O drops the 2 below the line and mc^2^ raises it, shown next to the default output where ~2~ is struck through. Two inline extensions win over the built-in strikethrough because extensions run first.",
  section: 'Custom extensions',
  tags: ['extensions','inline','sup','sub','del'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
