// g6 example: Animation: register a named animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: register a named animation",
  summary: "Two animation paradigms are registered under showcase-animation names and used as node.animation.update, next to the built-in translate.",
  section: 'Animation',
  tags: ["ExtensionCategory.ANIMATION", "register", "node.animation", "update"],
  docs: [
    "repo/packages/site/docs/manual/animation/custom-animation.en.md",
    "repo/packages/site/docs/manual/animation/animation.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
