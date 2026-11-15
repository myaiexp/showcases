// embedding-atlas example: registerRenderer with a custom renderer class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Register a custom renderer",
  summary:
    "registerRenderer({ name, renderer, options }) adds a renderer to every column style list: the renderer class draws a value as stars up to options.max, and the options class is the small editor shown in the column settings. The table styles the stars column with it.",
  section: "Data Formats",
  tags: ['registerRenderer', 'renderer', 'options', 'RendererProps', 'columnStyles'],
  docs: [
    'repo/packages/viewer/src/renderers/types.ts',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/docs/data-formats.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
