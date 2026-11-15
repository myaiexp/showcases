// embedding-atlas example: columnStyles in initialState per column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column styles in the saved state",
  summary:
    "columnStyles maps column names to { renderer, options, display }. Here the rating column uses a liquid-template renderer that prints stars, source gets the markdown renderer and a badge display, and words is hidden; the instances table shows the effect.",
  section: "State & Layouts",
  tags: ['columnStyles', 'ColumnStyle', 'renderer', 'liquid-template', 'options', 'display', 'initialState'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/viewer/src/renderers/types.ts',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
