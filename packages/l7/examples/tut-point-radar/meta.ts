// l7 example: Radar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar chart",
  summary:
    "The radar layer is a fixed shape that only shows with animation on. Both animate(true) and animate({ enable: true }) work; style.speed sets the turn rate.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'radar', 'animate', 'speed', 'style'],
  docs: ['repo/site/docs/tutorial/point/radar.en.md', 'repo/site/docs/api/point_layer/animate.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
