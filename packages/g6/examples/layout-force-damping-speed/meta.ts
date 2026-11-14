// g6 example: Force layout: damping, maxSpeed and interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: damping, maxSpeed and interval",
  summary: "damping slows nodes down each step, maxSpeed caps the movement per iteration and interval scales each step. Animation is on, so the sliders change how the layout settles.",
  section: 'Layout',
  tags: ["force", "damping", "maxSpeed", "interval", "animation"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
