// embedding-atlas example: toggling between points and density mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Points or density',
  summary:
    'The same hundred thousand points drawn both ways: config.mode "points" and "density". Settings live in one config object, so the switch passes a new config through update().',
  section: 'Config',
  tags: ['config', 'mode', 'EmbeddingViewConfig', 'update'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
