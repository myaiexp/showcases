// AntV Infographic example: JSX primitive: Fragment groups siblings without a node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSX primitive: Fragment groups siblings without a node',
  summary:
    'A Fragment, written <>…</>, returns several siblings from one component without adding an element. The Legend component returns three Rect and Text pairs in a fragment; the steps place it directly, inside a Group that moves it as a unit, and twice side by side to show it is just its parts.',
  section: 'JSX primitives',
  tags: ['Fragment', 'createFragment', 'Group', 'jsxImportSource', 'component'],
  docs: [
    'repo/site/src/content/reference/jsx.en.md',
    'repo/site/src/content/reference/primitive-nodes.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
