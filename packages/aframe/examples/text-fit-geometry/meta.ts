// aframe example: text: scale text to a geometry, or the geometry to the text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "text: scale text to a geometry, or the geometry to the text",
  summary: "Next to a geometry, text sizes itself against it. With no text width the text scales to the plane's width; with the plane's width and height at 0 the plane grows to hug the text's own width; with neither the text defaults to one metre wide. A slider changes the first plane's width.",
  section: 'Components',
  tags: ["text", "geometry", "width", "height", "plane", "auto-scaling", "zOffset"],
  docs: ["repo/docs/components/text.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
