// embedding-atlas example: capping rendered points with downsampleMaxPoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Downsampling',
  summary:
    'config.downsampleMaxPoints caps how many points are drawn (4,000,000 by default; null turns it off). The sample keeps proportionally more points in sparse areas, so a cap of ten thousand still shows every cluster\'s shape out of a million and a half points.',
  section: 'Config',
  tags: ['config', 'downsampleMaxPoints'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
