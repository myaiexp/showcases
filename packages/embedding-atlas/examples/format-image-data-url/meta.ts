// embedding-atlas example: the image renderer on data URLs, size option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image column: data URL",
  summary:
    "A column of data:image/png;base64 strings shown with { renderer: \"image\", options: { size } }. size is the maximum width and height in pixels; the PNGs were drawn on a canvas in code.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: image', 'options.size', 'data URL'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
