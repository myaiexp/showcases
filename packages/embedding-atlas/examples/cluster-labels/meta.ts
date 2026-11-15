// embedding-atlas example: automatic cluster labels named by queryClusterLabels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic cluster labels',
  summary:
    'Given queryClusterLabels, the view turns on automatic labels: it finds dense clusters itself and asks the app to name each one, passing rectangles that roughly cover it. Here the name is the commonest long word among the texts of the points inside.',
  section: 'EmbeddingView',
  tags: ['queryClusterLabels', 'Rectangle', 'autoLabelEnabled', 'LabelContent'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
