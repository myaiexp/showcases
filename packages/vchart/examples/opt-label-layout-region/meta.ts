// vchart example: Chart labelLayout: series or region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart labelLayout: series or region",
  summary:
    "Two close line series both show value labels. With labelLayout series each series avoids its own overlaps only; with region the labels of all series in the region are laid out together, so they stop covering each other.",
  section: "Option: Common",
  tags: ["labelLayout","label","overlap","common chart"],
  docs: [
    'repo/docs/assets/option/en/common/chart-spec.md',
    'repo/docs/assets/option/en/common/series.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
