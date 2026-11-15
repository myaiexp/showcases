// d2 example: A second board
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A second board",
  summary:
    "`layers: { numbers: { 1 -> 2 } }` declares a second board next to the root one. Render shows the root board by default, one board with `target: 'layers.numbers'`, or both as a single animated SVG with `target: '*'` and an `animateInterval`.",
  section: "Composition",
  tags: ["layers", "target", "animateInterval", "boards"],
  docs: [
    "repo/docs/tour/composition.md",
    "repo/docs/tour/composition-formats.md",
    "repo/d2js/js/README.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
