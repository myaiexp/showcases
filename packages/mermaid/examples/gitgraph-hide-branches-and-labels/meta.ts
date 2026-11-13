// mermaid example: GitGraph hidden branches, hidden labels and label layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GitGraph hidden branches, hidden labels and label layout',
  summary:
    'showBranches false drops branch names and lines, showCommitLabel false drops commit labels, and rotateCommitLabel switches between rotated and horizontal labels.',
  section: 'GitGraph',
  tags: ['gitgraph', 'showBranches', 'showCommitLabel', 'rotateCommitLabel'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gitgraph.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
