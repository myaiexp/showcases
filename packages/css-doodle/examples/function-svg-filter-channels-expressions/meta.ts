// channels take sums such as 1 - r and .5g + .2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: channel sums",
  summary: "A channel is set to a sum of input channels and a number: 1 - r inverts red, .5g + .2 halves green and lifts it, 2 * b doubles blue. Channels not listed stay as they are. The picture is a plain three-color gradient so each change is easy to see.",
  section: "SVG",
  tags: ["@svg-filter","channels","feColorMatrix"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
