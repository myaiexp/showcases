// embedding-atlas example: data.features builds a features list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Features list from data.features',
  summary:
    'Setting data.features to a list-of-text column adds a Features chart: each distinct feature with a frequency bar, clickable to filter rows that contain it. The select compares it against the same table with the column left to the ordinary count plot.',
  section: 'EmbeddingAtlas',
  tags: ['data.features', 'features-list', 'defaultChartsConfig'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/viewer/src/charts/default_charts.ts',
    'repo/packages/viewer/src/charts/features/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
