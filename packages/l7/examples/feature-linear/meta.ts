// l7 example: Feature linear: sourceColor to targetColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature linear: sourceColor to targetColor",
  summary:
    "sourceColor and targetColor in style give each arc a gradient from its start to its end. The gradient takes priority over the colour from color().",
  section: "Layer: Features",
  tags: ["linear","sourceColor","targetColor"],
  docs: ["repo/site/docs/api/common/features/linear.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
