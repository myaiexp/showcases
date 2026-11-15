// embedding-atlas example: the image renderer on bare base64 strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image column: raw base64",
  summary:
    "The same PNGs stored as raw base64 text, with no data: prefix. The image renderer sniffs the binary content to find the image type, so the column needs no extra markup.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: image', 'options.size', 'base64'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
