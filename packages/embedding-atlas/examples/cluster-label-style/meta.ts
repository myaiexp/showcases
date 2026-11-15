// embedding-atlas example: cluster label styling via theme colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label colours',
  summary:
    'Three theme settings style every label: clusterLabelColor for the text, clusterLabelOutlineColor for the halo that keeps it legible over points, and clusterLabelOpacity. Four colour pairs and an opacity slider.',
  section: 'Theme',
  tags: ['theme', 'clusterLabelColor', 'clusterLabelOutlineColor', 'clusterLabelOpacity'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/theme.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
