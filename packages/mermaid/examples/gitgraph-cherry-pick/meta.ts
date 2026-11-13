// mermaid example: GitGraph cherry-pick and merge-commit parents
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GitGraph cherry-pick and merge-commit parents',
  summary:
    'cherry-pick id copies a commit from another branch onto the current one, and parent picks which side of a merge commit to take.',
  section: 'GitGraph',
  tags: ['gitgraph', 'cherry-pick', 'merge', 'parent'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gitgraph.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
