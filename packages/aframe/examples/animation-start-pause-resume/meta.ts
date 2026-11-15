// aframe example: animation: startEvents, pauseEvents and resumeEvents
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: startEvents, pauseEvents and resumeEvents",
  summary: "A box animation that waits for events: start restarts it, pause freezes it where it is and resume carries on. Buttons call el.emit with bubbling off, the way the docs aim an animation at one entity.",
  section: 'Components',
  tags: ["animation", "startEvents", "pauseEvents", "resumeEvents", "emit", "animationbegin", "animationcomplete"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
