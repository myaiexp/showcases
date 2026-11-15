// embedding-atlas example: showing a tooltip by setting the tooltip prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip from code',
  summary:
    'tooltip is a controlled prop. Passing a DataPoint (x, y, category, text, identifier) highlights that point and opens the default tooltip with its text; null closes it. No querySelection is needed when the app picks the point itself.',
  section: 'EmbeddingView',
  tags: ['tooltip', 'DataPoint', 'onTooltip'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/types.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
