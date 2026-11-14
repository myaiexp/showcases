// motion example: Icon that morphs between shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Icon that morphs between shapes",
  summary: "Toolbar icons that change shape: a menu whose bars cross into a close X, a play triangle that splits into pause bars, and an avatar mask that cycles circle, squircle, diamond. Motion animates the path's d attribute, which needs the same commands in the same order in every shape.",
  section: "Guides",
  tags: ["animate","d","SVG path","morph"],
  docs: ["pages/motion-dev/docs/svg-animation.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
