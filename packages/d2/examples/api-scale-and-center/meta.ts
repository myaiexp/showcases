// d2 example: How scale and center size the SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "How scale and center size the SVG",
  summary:
    "Without `scale`, D2 writes an SVG with only a viewBox, so it fits whatever holds it. `scale: 1` gives it a fixed real size and `scale: 0.5` half that; `center: true` changes how it sits in its viewBox. The panel shows the outer svg tag D2 wrote for each.",
  section: "D2.js API",
  tags: ["scale", "center", "render", "svg"],
  docs: [
    "repo/d2js/js/README.md",
    "repo/d2js/js/index.d.ts",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
