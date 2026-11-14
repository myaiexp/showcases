// marked example: Fenced code blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fenced code blocks",
  summary:
    'Lines between three backticks (or three tildes) become a code block, and a language name after the opening fence is added to the HTML as a class. Syntax highlighters use that class.',
  section: 'Supported Markdown',
  tags: ['code','fences','language-js'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Renderer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
