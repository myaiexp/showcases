// marked example: Live Markdown editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live Markdown editor',
  summary:
    'Plain text with a few symbols (# for a heading, ** for bold, - for a list) turns into a formatted page as you type. marked.parse() converts the Markdown to HTML on every keystroke.',
  section: 'Usage',
  tags: ['marked.parse', 'live preview'],
  docs: ['repo/docs/INDEX.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-06-14',
});
