// vchart example: Chart padding: a number, an object, percentages and functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart padding: a number, an object, percentages and functions",
  summary:
    "Chart padding as a plain number, as an object of four sides, with percentage strings and with callbacks that read the layout rectangle. The tinted canvas shows how far the plot sits from each edge.",
  section: "Option: Common",
  tags: ["padding","ILayoutNumber","top","right","bottom","left"],
  docs: [
    'repo/docs/assets/option/en/common/padding.md',
    'repo/docs/assets/option/en/common/layout-padding.md',
    'repo/docs/assets/option/en/common/layout-number.md',
    'repo/docs/assets/option/en/common/chart-spec.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
