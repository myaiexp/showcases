// vchart example: Chart background: linear, radial and conical gradients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart background: linear, radial and conical gradients",
  summary:
    "The chart-level background takes a gradient object as well as a colour string. A select switches between linear, radial and conical gradients and a slider turns the linear gradient's direction.",
  section: "Option: Common",
  tags: ["background","gradient","linear","radial","conical","stops"],
  docs: [
    'repo/docs/assets/option/en/common/background.md',
    'repo/docs/assets/option/en/graphic/gradient.md',
    'repo/docs/assets/option/en/common/chart-spec.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
