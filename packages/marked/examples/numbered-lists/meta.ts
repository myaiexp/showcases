// marked example: Numbered lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Numbered lists",
  summary:
    'Lines starting with a number and a dot become a numbered list, and the first number you type is where counting starts. Marked adds a start attribute when it is not 1.',
  section: 'Supported Markdown',
  tags: ['list','ol','start'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Renderer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
