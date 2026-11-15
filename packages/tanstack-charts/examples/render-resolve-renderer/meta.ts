// tanstack-charts example: Which renderer a scene resolves to
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Which renderer a scene resolves to",
  summary:
    "resolveChartRenderer returns the renderer that should mount a compiled scene. A scene whose nodes all use the default renderer resolves to that default. A scene with a canvas mark resolves to a composed layered renderer. The readout compiles both without mounting and prints the ids.",
  section: "Rendering and Export",
  tags: ['resolveChartRenderer', 'svgChartRenderer', 'createChartScene', 'renderer'],
  docs: [
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/reference/runtime-and-scene.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
