// mod, fract, clamp, mix and step inside $()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: the GLSL helpers",
  summary: "$() has the GLSL math functions that @ calls do not: mod, fract, clamp, mix, step and smoothstep. Each variant turns the cell index into a bar height with a different one.",
  section: "Values",
  tags: ["$()","mod","fract","clamp","mix","step"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
