// embedding-atlas example: steering automatic labels with autoLabelStopWords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stop words',
  summary:
    'config.autoLabelStopWords lists words the automatic labeller skips (NLTK\'s stop words by default). Adding a topic\'s top words to the list makes its cluster fall back to the next most telling word.',
  section: 'EmbeddingViewMosaic',
  tags: ['config', 'autoLabelStopWords', 'text'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
