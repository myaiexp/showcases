// mermaid example: GitGraph main branch name and branch order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GitGraph main branch name and branch order',
  summary:
    'mainBranchName renames the root branch, order: on a branch sets its row, and mainBranchOrder moves the main branch into that ordering.',
  section: 'GitGraph',
  tags: ['gitgraph', 'mainBranchName', 'mainBranchOrder', 'order'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gitgraph.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
