// embedding-atlas example: the minimumDensity threshold for density contours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minimum density',
  summary:
    'config.minimumDensity is the average density, in points per square CSS pixel, an area needs before its contour shows. The slider sweeps it on a log scale over data with a lot of scattered noise.',
  section: 'Config',
  tags: ['config', 'minimumDensity', 'mode'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
