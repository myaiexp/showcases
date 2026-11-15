// embedding-atlas example: theming or hiding the status bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Status bar',
  summary:
    'The strip along the bottom edge is the status bar. theme.statusBar: false hides it; statusBarTextColor and statusBarBackgroundColor restyle it.',
  section: 'Theme',
  tags: ['theme', 'statusBar', 'statusBarTextColor', 'statusBarBackgroundColor'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/theme.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
