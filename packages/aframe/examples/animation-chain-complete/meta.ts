// aframe example: animation: animationcomplete starts the next step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: animationcomplete starts the next step",
  summary: "Three animations wait on their own startEvents; each one's animationcomplete event, whose detail carries the animation's name, triggers the next, so a box walks a square and loops. The read-out lists the begin and complete events.",
  section: 'Components',
  tags: ["animation", "animationbegin", "animationcomplete", "animationcomplete__id", "startEvents", "detail.name"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
