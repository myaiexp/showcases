// tanstack-charts example: reconcileChartSvg with entries and exits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "reconcileChartSvg with entries and exits",
  summary:
    "Two SVG strings for the same chart are swapped by reconcileChartSvg, which matches elements by data-ts-key. Surviving bars move and resize, new bars fade in and removed bars fade out. The controls set the duration and easing, and calling it again cancels the running frame loop.",
  section: "Rendering and Export",
  tags: ['reconcileChartSvg', 'ChartAnimationOptions', 'easing', 'data-ts-key'],
  docs: [
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/reference/runtime-and-scene.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
