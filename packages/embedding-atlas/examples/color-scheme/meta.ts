// embedding-atlas example: config.colorScheme light and dark compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Light and dark',
  summary:
    'config.colorScheme picks the light or the dark look: label colours and outlines, the status bar and tooltips all follow it. Left out, the view is light.',
  section: 'Config',
  tags: ['config', 'colorScheme', 'labels'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
    'repo/packages/component/src/lib/embedding_view/theme.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
