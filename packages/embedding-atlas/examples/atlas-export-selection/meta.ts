// embedding-atlas example: the onExportSelection callback, no download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Export selection callback',
  summary:
    'Giving Atlas an onExportSelection(predicate, format) callback adds a download button beside the selected-point count. The callback here downloads nothing: it prints the predicate and format it was given, the COPY statement they would become, and the row count and first ids that predicate selects.',
  section: 'EmbeddingAtlas',
  tags: ['onExportSelection', 'predicate', 'format'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
