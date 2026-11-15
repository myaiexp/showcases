// escape(c): the Mandelbrot set in one call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "escape(c): the Mandelbrot set in one call",
  summary: "escape(z, c) runs the z → z² + c loop for you; with only c it starts from 0, so the Mandelbrot set is one call. The variant zooms into the boundary by shrinking the window around a point.",
  section: "Patterns",
  tags: ["@pattern", "escape", "cos", "vec3"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
