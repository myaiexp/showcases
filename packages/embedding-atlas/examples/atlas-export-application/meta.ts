// embedding-atlas example: the onExportApplication callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Export application callback',
  summary:
    'onExportApplication is an async callback with no arguments that Atlas calls when the reader asks to download the app as an archive. The stub here logs each call instead of building a file; the select compares a mounted callback with null.',
  section: 'EmbeddingAtlas',
  tags: ['onExportApplication', 'null'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
