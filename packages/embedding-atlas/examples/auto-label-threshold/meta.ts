// embedding-atlas example: filtering clusters before automatic labelling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label density threshold',
  summary:
    'config.autoLabelDensityThreshold drops clusters whose density is below that fraction of the densest one before any are labelled. The readout counts how many clusters reach queryClusterLabels as the threshold rises.',
  section: 'Config',
  tags: ['config', 'autoLabelDensityThreshold', 'queryClusterLabels'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
