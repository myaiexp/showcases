// aframe example: material: a video texture on a plane and a sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: a video texture on a plane and a sphere",
  summary: "A <video> element fed by a canvas stream (the offline stand-in for a file) is passed to material src by selector, the way the docs do with #my-video. A flat plane shows it unlit and a standard-material sphere wraps it; the materialvideoloadeddata event fires when frames arrive.",
  section: 'Components',
  tags: ["material", "src", "video", "flat", "materialvideoloadeddata", "video texture", "srcObject"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
