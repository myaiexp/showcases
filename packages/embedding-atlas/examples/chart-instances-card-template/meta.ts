// embedding-atlas example: instances cardTemplate, a Liquid template
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Card template with Liquid",
  summary:
    "cardTemplate is a Liquid template rendered once per row, with each column available as a variable. The card brings its own padding and a style block that switches colors under .dark, so it reads in both color schemes.",
  section: "Charts",
  tags: ['instances', 'cardTemplate', 'viewMode: cards', 'liquid', 'columns'],
  docs: [
    'repo/packages/viewer/src/charts/instances/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
