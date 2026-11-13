// Perspective example: export(), copy() and download() per method
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Export methods',
  summary:
    'Pick an export method (csv, json, ndjson, html, json-config, Arrow with ZSTD, the -all variant, or plugin) and see what viewer.export() returns. With a chart active, "plugin" returns a PNG. copy() and download() take the same methods.',
  section: 'Viewer',
  tags: ['export', 'copy', 'download', 'csv', 'arrow', 'json-config', 'plugin'],
  docs: ['repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
