// embedding-atlas example: the image renderer on { bytes, path } objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image column: bytes object",
  summary:
    "A struct column with a bytes field (a BLOB, so a Uint8Array in the browser) and a path file name, built in DuckDB with from_base64. The path helps the renderer detect the type, and the image renderer draws it like any other image.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: image', 'bytes', 'path', 'options.size'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
