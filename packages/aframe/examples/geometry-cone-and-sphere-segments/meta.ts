// aframe example: geometry: cone radii and low-poly sphere segments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: cone radii and low-poly sphere segments",
  summary: "A cone is a cylinder with different top and bottom radii, here from a point to a flat top. Cutting a sphere's segmentsWidth and segmentsHeight gives faceted shapes, and phiLength, thetaStart and thetaLength take a slice of it.",
  section: 'Components',
  tags: ["geometry", "cone", "radiusTop", "radiusBottom", "sphere", "segmentsWidth", "segmentsHeight", "phiLength", "thetaLength", "flatShading"],
  docs: ["repo/docs/components/geometry.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
