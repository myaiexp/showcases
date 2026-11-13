// echarts example: Sunburst focus on ancestors, descendants and relatives
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst focus on ancestors, descendants and relatives",
  summary:
    "Highlight a sector and fade the rest. emphasis.focus can keep only the ancestors, only the descendants, or since 5.6 both with relative. The preview highlights sectors in turn by dispatchAction.",
  section: 'Option: series.sunburst',
  tags: ['sunburst', 'emphasis.focus', 'ancestor', 'descendant', 'relative', 'blur', 'highlight'],
  docs: ['repo/en/option/series/sunburst.md', 'repo/en/option/partial/emphasis-common.md', 'repo/contents/en/basics/release-note/5-6-0.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
