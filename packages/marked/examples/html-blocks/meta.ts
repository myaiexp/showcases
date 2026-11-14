// marked example: HTML blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTML blocks",
  summary:
    'A block of HTML starting a line is passed through untouched, and the Markdown inside it is not converted until a blank line separates it. It matters when mixing hand-written HTML with Markdown.',
  section: 'Supported Markdown',
  tags: ['html','details','block'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
