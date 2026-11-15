// aframe example: geometry: torus arc, and a torus knot's p and q
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: torus arc, and a torus knot's p and q",
  summary: "A half donut from the torus arc property, and a torusKnot whose p and q integers choose the knot. Sliders change p and q live; when they are not coprime the result is a torus link.",
  section: 'Components',
  tags: ["geometry", "torus", "arc", "radiusTubular", "torusKnot", "p", "q", "segmentsTubular"],
  docs: ["repo/docs/components/geometry.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
