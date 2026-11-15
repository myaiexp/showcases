// penrose example: Comments in Substance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Comments in Substance',
  summary:
    'A Substance comment starts with `--`, on its own line or after a statement. The parser ignores it, so the commented-out `Edge` lines are not drawn and the active ones are.',
  section: 'Substance',
  tags: ['comment', 'predicate'],
  docs: ['repo/packages/docs-site/docs/ref/substance/overview.md', 'repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
