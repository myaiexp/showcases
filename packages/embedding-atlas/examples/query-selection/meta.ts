// embedding-atlas example: hover and click picking through querySelection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'querySelection',
  summary:
    'The plain EmbeddingView does not search its own points: hover and click call querySelection(x, y, unitDistance), which here asks a grid index for the nearest point within six pixels. What it returns becomes the tooltip, the click selection, and the onTooltip and onSelection events in the log.',
  section: 'EmbeddingView',
  tags: ['querySelection', 'unitDistance', 'DataPoint', 'onTooltip', 'onSelection'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
