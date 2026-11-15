// tanstack-charts example: resolveLayout bins points by screen cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "resolveLayout bins points by screen cells",
  summary:
    "A custom mark that waits for the final scales and plot bounds, then bins 4,000 points into fixed-size screen cells and paints each cell by its count. This is the case the docs give for resolveLayout: the binning depends on pixels, so it cannot run during initialize. The slider changes the cell size.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'resolveLayout', 'MarkResolvedLayoutContext', 'channels'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
