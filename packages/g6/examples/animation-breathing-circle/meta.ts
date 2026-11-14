// g6 example: Animation: persistent breathing node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: persistent breathing node",
  summary: "A node subclass animates its halo lineWidth forever with direction alternate. Controls change the duration and direction.",
  section: 'Animation',
  tags: ["onCreate", "iterations", "direction", "halo", "ExtensionCategory.NODE"],
  docs: [
    "repo/packages/site/docs/manual/animation/animation.en.md",
    "repo/packages/site/common/manual/core-concept/animation/breathing-circle.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
