// vchart example: Visual scale: changeDomain none, replace and expand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Visual scale: changeDomain none, replace and expand",
  summary:
    "A global scale maps a field to a bubble size. changeDomain decides whether the scale keeps its own domain, takes the series' data range, or takes the union of both. Data beyond the scale's domain shows the difference.",
  section: "Option: Common",
  tags: ["scales","visualScale","scale","field","changeDomain","size"],
  docs: [
    'repo/docs/assets/option/en/common/visual-scale.md',
    'repo/docs/assets/option/en/common/scale.md',
    'repo/docs/assets/option/en/common/visual-scale-spec.md',
    'repo/docs/assets/option/en/common/mark-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
