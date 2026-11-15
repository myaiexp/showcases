// embedding-atlas example: the liquid-template renderer and its template option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Liquid template renderer",
  summary:
    "The liquid-template renderer fills a Liquid template with the cell as {{ value }}. Three templates on the stars column: the default, a row of star glyphs built with a loop, and a colored badge chosen by a condition.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: liquid-template', 'options.template', 'liquid'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
