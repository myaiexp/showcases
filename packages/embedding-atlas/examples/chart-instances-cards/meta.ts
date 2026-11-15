// embedding-atlas example: instances viewMode cards with the default card
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Instances as cards",
  summary:
    "viewMode: \"cards\" lays the rows out as cards instead of a table. Without a cardTemplate each card lists its columns with the column styles, here three columns of the docs table in pages of six.",
  section: "Charts",
  tags: ['instances', 'viewMode: cards', 'columns', 'pageSize'],
  docs: [
    'repo/packages/viewer/src/charts/instances/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
