// tanstack-charts example: Ridgeline curve and outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ridgeline curve and outline',
  summary:
    'The curve option takes any object with a line function, so d3Curve(curveBasis) smooths the bin steps. stroke: null drops the outline, and strokeDasharray dashes it. The select moves through straight, smoothed, no outline and a dashed outline.',
  section: 'Ridgeline Marks',
  tags: ['ridgelineY', 'curve', 'd3Curve', 'stroke', 'strokeDasharray'],
  docs: ['repo/docs/reference/marks/ridgeline.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
