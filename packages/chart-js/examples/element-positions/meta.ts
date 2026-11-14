// Chart.js example: Labels placed with getDatasetMeta
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Labels placed with getDatasetMeta',
  summary:
    "getDatasetMeta(0).data holds every bar's drawn x and y. An afterDraw plugin uses them to move HTML badges that ride along as the bars animate.",
  section: 'Developers',
  tags: ['getDatasetMeta', 'plugin', 'afterDraw', 'html overlay'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
