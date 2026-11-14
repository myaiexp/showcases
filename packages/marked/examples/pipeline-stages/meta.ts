// marked example: From text to page, stage by stage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'From text to page, stage by stage',
  summary:
    'One note walked through each stage of Marked: the source text, tokens from the lexer, a walkTokens edit, the HTML the renderer makes for each block, the HTML string and the finished page. Click a stage or press Play.',
  section: 'The pipeline',
  tags: ['lexer', 'walkTokens', 'renderer', 'parser', 'pipeline'],
  docs: ['repo/docs/USING_PRO.md', 'repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
