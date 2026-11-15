// tanstack-charts example: mosaicY proportional cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mosaicY proportional cells",
  summary:
    "mosaicY allocates x width by each question's total and splits y inside it by response, giving a mosaic whose area is the count. Raw answers are counted with groupBy first, as the docs advise, and rect draws the cells with the response as colour.",
  section: "Data Transforms",
  tags: ["mosaicY", "groupBy", "rect"],
  docs: [
    'repo/docs/reference/transforms.md',
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
