// marked example: Bullet lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bullet lists",
  summary:
    'Lines starting with -, * or + become bullet points, and indenting a line puts it one level deeper. Marked builds nested ul and li tags.',
  section: 'Supported Markdown',
  tags: ['list','ul','nesting'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
