// embedding-atlas example: instances columnStyles overriding the global styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column styles on one instances chart",
  summary:
    "An instances chart takes its own columnStyles, which win over the ones in initialState. Globally the stars column is plain markdown; this table overrides it with a liquid-template that prints a glyph row, and the note column stays markdown.",
  section: "Data Formats",
  tags: ['instances', 'columnStyles', 'renderer: liquid-template', 'renderer: markdown', 'override'],
  docs: [
    'repo/packages/viewer/src/charts/instances/types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
