// href: path { } is referenced as #id and also drawn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: href to an element block",
  summary: "For href, the reference is #id rather than url(#id). A block given as href on a textPath makes the path the text follows. Such elements go to the top level of the SVG, so the path is drawn as well.",
  section: "SVG",
  tags: ["@svg","textPath","href","text"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
