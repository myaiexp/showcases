// vega example: KDE: Shared Domain per Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "KDE: Shared Domain per Group",
  summary:
    "Three groups of 40 measurements, one density curve each. Independent resolution lets each curve choose its own range and sample count; shared forces one range, as the title's total sample count shows.",
  section: 'Transforms: Basic',
  tags: ["transform.kde.groupby", "transform.kde.resolve", "transform.kde.as", "marks.group.from.facet"],
  docs: ["repo/docs/docs/transforms/kde.md", "repo/docs/docs/marks/group.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
