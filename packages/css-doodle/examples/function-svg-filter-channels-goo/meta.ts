// blur then channels { a: 20a - 8 } melts touching shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: gooey blobs",
  summary: "Blur the whole container, then sharpen the alpha channel with a: 20a - 8, so shapes that touch melt together into one blob. Each circle gets a random size and offset, and every redraw is a new puddle.",
  section: "SVG",
  tags: ["@svg-filter","blur","channels",":container","@r"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
