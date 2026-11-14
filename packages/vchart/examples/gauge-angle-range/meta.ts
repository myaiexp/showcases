// vchart example: Gauge dial angle range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge dial angle range",
  summary:
    "The dial's sweep is set by startAngle and endAngle, so the same 0.7 reading can sit on a half, three-quarter or full circle. Two sliders move the end points; the preview steps through four dials.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'startAngle', 'endAngle'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/chart/gauge.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
