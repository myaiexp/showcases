// leafer-ui example: Motion: motionPrecision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Motion: motionPrecision",
  summary: "motionPrecision sets how precisely a distance on a curve is turned into a position (default 1 px). With a very uneven Bézier, a coarse value of 150 puts the same ten markers visibly off. The readout gives the largest difference between the two copies.",
  section: "Element animation",
  tags: ["motionPrecision", "getMotionPoint", "getMotionTotal", "motionPath"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/motionPath.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
