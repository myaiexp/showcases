// d2 example: Animated SVG export
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animated SVG export",
  summary:
    "With `target: '*'` and an `animateInterval`, render packs every board into one SVG that shows each for that many milliseconds and loops, using CSS animation inside the SVG. The three variants run the same steps at 1200, 400 and 3000 ms.",
  section: "Exports",
  tags: ["animateInterval", "target", "steps"],
  docs: [
    "repo/docs/tour/composition-formats.md",
    "repo/docs/tour/steps.md",
    "repo/d2js/js/README.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
