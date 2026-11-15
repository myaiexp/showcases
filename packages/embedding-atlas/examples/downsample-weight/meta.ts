// embedding-atlas example: the density weight of the downsampling formula
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Downsampling density weight',
  summary:
    'config.downsampleDensityWeight (0–10, default 5) is the weight in the sampling formula P(i) = (max / inView) · 2 / (1 + density / maxDensity · weight). With fifteen thousand points kept out of eight hundred thousand, higher weights empty the cluster cores and keep the sparse fringe.',
  section: 'Config',
  tags: ['config', 'downsampleDensityWeight', 'downsampleMaxPoints'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
