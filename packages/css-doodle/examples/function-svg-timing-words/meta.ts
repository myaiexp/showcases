// Duration, delay, repeat, easing, discrete, forwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: the timing words",
  summary: "After the slash, animate reads timing like the CSS animation shorthand: the first time is the duration and the second the delay, a bare number is a repeat count, and words such as ease, discrete, paced and forwards set the easing and the fill. Each variant moves a dot along a track with a different mix.",
  section: "SVG",
  tags: ["@svg","animate","infinite","ease","discrete","paced","forwards"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
