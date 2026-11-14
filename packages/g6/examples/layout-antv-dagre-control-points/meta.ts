// g6 example: AntvDagre layout: controlPoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AntvDagre layout: controlPoints",
  summary: "controlPoints keeps the routes dagre computed for each edge in style.controlPoints, which polyline edges draw. A toggle compares them with the polyline edge own routing.",
  section: 'Layout',
  tags: ["antv-dagre", "controlPoints", "polyline"],
  docs: [
    "repo/packages/site/docs/manual/layout/AntvDagreLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
