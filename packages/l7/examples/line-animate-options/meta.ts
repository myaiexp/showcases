// l7 example: animate: duration, interval, trailLength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animate: duration, interval, trailLength",
  summary:
    "duration is seconds per pass, interval (0-1) splits the line into repeats, trailLength (0-1) is how long each trail is. Drag each slider while it runs.",
  section: "Line Layer",
  tags: ["animate","duration","interval","trailLength"],
  docs: ["repo/site/docs/api/line_layer/animate.en.md","repo/site/docs/api/common/features/animate.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
