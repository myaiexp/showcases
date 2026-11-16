// aframe example: geometry: cylinder, tube, curved surface and prism
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: cylinder, tube, curved surface and prism",
  summary: "One cylinder primitive makes a can, an open-ended tube, a half-cylinder curved surface with thetaLength: 180 and a hexagonal prism with segmentsRadial: 6. Open-ended shapes need side: double so the inside shows.",
  section: 'Components',
  tags: ["geometry", "cylinder", "openEnded", "thetaLength", "segmentsRadial", "side: double"],
  docs: ["repo/docs/components/geometry.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
