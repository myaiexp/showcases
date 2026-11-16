// aframe example: visible: reveal an entity when its texture has loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "visible: reveal an entity when its texture has loaded",
  summary: "The docs' pattern for hiding an entity until its texture is ready, using only the animation component: visible=false plus an animation of visible to true with startEvents: materialtextureloaded, so the box pops in after the painted texture arrives and a one-second boolean cycle. The caption follows the events.",
  section: 'Components',
  tags: ["visible", "animation", "startEvents", "materialtextureloaded", "material", "src"],
  docs: ["repo/docs/components/visible.md", "repo/docs/components/animation.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
