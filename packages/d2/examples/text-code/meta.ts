// d2 example: Code blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Code blocks',
  summary:
    'The language after the opening pipe picks the highlighter, so `|go` colours Go. D2 also takes short aliases (`js`, `py`, `ts`, `rb`) and shows an unrecognised language as plain text.',
  section: 'Text & Code',
  tags: ['code', 'block string'],
  docs: ['repo/docs/tour/text.md', 'repo/static/d2/code-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
