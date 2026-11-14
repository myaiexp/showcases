// g6 example: Animation: persistent ant line edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: persistent ant line edge",
  summary: "An edge subclass loops lineDashOffset with iterations Infinity from onCreate. Sliders change the cycle time and dash size.",
  section: 'Animation',
  tags: ["onCreate", "iterations", "lineDashOffset", "lineDash", "ExtensionCategory.EDGE"],
  docs: [
    "repo/packages/site/docs/manual/animation/animation.en.md",
    "repo/packages/site/common/manual/core-concept/animation/ant-line.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
