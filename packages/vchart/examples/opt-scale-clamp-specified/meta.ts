// vchart example: Scales: clamp on a linear scale and specified on an ordinal one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scales: clamp on a linear scale and specified on an ordinal one",
  summary:
    "Two global scales drive bubble colour and size. The ordinal colour scale overrides chosen categories with specified; the linear size scale stops at its range ends when clamp is on, so out-of-domain values stop growing.",
  section: "Option: Common",
  tags: ["scales","specified","clamp","ordinal","linear","domain","range"],
  docs: [
    'repo/docs/assets/option/en/common/visual-scale-spec.md',
    'repo/docs/assets/option/en/common/scale.md',
    'repo/docs/assets/option/en/common/visual-scale.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
