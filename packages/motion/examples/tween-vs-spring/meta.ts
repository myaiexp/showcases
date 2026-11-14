// motion example: Tween versus spring on the same move
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tween versus spring on the same move",
  summary: "A panel slides out with a tween (duration plus easing curve) and with a spring (physics), drawn on a graph. Interrupt either one mid-move to see the spring carry its speed while the tween restarts.",
  section: "Guides",
  tags: ["tween","duration","ease","spring","keyframes","times"],
  docs: ["pages/motion-dev/docs/tween.md","pages/motion-dev/docs/spring.md","pages/motion-dev/docs/animate.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
