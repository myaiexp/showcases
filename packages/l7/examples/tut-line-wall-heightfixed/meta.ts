// l7 example: Wall heightfixed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wall heightfixed",
  summary:
    "By default a wall keeps its real-world height; heightfixed: true switches to a fixed height unit, so size must be re-chosen (the docs say to mind size): this one jumps from 40 to 3,000,000. Zoom and compare.",
  section: "Tutorial: Line",
  tags: ["wall","heightfixed"],
  docs: ["repo/site/docs/tutorial/line/wall.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
