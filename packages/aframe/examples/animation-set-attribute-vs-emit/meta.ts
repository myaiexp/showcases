// aframe example: animation: setAttribute twice does nothing, emit restarts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: setAttribute twice does nothing, emit restarts",
  summary: "Two boxes get the same finite slide. The left one is configured with setAttribute on every click; A-Frame sees identical data the second time, so nothing plays and no animationcomplete fires. The right one is configured once with a startEvents and restarted with emit each time.",
  section: 'Components',
  tags: ["animation", "setAttribute", "emit", "startEvents", "animationcomplete"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
