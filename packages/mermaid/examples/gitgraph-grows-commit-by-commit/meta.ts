// mermaid example: Git history that grows commit by commit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Git history that grows commit by commit',
  summary:
    'A git graph that adds one command at a time on a timer: commits, a feature branch, a cherry-pick, a merge and a release tag. Restart replays the history.',
  section: 'GitGraph',
  tags: ['gitGraph', 'commit', 'branch', 'merge', 'cherry-pick', 'tag'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gitgraph.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
