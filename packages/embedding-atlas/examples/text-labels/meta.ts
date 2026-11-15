// embedding-atlas example: hand-placed text labels through the labels prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text labels',
  summary:
    'The labels prop takes a list of { x, y, content } in data coordinates. Each topic gets its name at its centre; the view places them so they never overlap and keeps them a fixed size as you zoom.',
  section: 'EmbeddingView',
  tags: ['labels', 'Label', 'content'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
