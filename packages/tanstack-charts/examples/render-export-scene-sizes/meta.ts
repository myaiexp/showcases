// tanstack-charts example: Explicit export dimensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Explicit export dimensions",
  summary:
    "The same definition is compiled at three explicit sizes and serialized with renderChartSvg, and each string is shown as an image. Layout, margins and tick counts follow the size because the scene is compiled for it, which is why the guide asks for explicit dimensions instead of responsive browser sizes. The string has no xmlns, so the page adds one before using it as a file.",
  section: "Exporting",
  tags: ['createChartScene', 'renderChartSvg', 'explicit size', 'theme'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
