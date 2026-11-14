// marked example: Autolinks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Autolinks",
  summary:
    'Web addresses and email addresses become links without any link syntax: in angle brackets always, and bare in the text with GitHub Flavored Markdown. A bare www. address is given an http:// start.',
  section: 'Supported Markdown',
  tags: ['autolink','GFM','email','url'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
