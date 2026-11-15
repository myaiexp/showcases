// Control points flip with the rest of the path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flip: mirroring curves",
  summary: "Control points flip with the rest of the path. The pink petal is the stored path; the black path draws its three mirrors by transforming that pick with .p: @flipH.p @flipV.p @flip.p, and a four-leaf flower appears.",
  section: "SVG",
  tags: ["@flipH","@flipV","@flip","curve","@p"],
  docs: ["pages/css-doodle-com/reference/function-flip.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
