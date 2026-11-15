// embedding-atlas example: a content-viewer chart for the selected row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Content viewer",
  summary:
    "A { type: \"content-viewer\", field: \"text\" } chart shows the text column of the row last selected elsewhere. In the full view click a row in the instances table beside it and the viewer fills in.",
  section: "Charts",
  tags: ['content-viewer', 'field', 'instances', 'columns'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/charts/instances/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
