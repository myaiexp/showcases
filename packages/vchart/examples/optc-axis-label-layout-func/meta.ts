// vchart example: Axis label layoutFunc and dataFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis label layoutFunc and dataFilter",
  summary: "With sampling off, label.dataFilter chooses which labels exist and layoutFunc positions them by hand: here every label is lifted by an alternating offset so neighbours never collide.",
  section: "Option: Components",
  tags: ["axes.label.layoutFunc","label.dataFilter","sampling"],
  docs: [
    'repo/docs/assets/option/en/component/axis-common/cartesian-axis.md',
    'repo/docs/assets/option/en/component/axis-common/axis-label.md',
    'repo/docs/assets/option/en/component/axis-common/base-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
