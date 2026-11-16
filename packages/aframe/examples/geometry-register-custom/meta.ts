// aframe example: geometry: registerGeometry with a schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "geometry: registerGeometry with a schema",
  summary: "Registers a star geometry built as a THREE.BufferGeometry in init(data); its points and inner properties become geometry properties, so primitive: star works on any entity. A slider re-shapes the star and a second entity uses the docs' vertices-array geometry.",
  section: 'Components',
  tags: ["registerGeometry", "schema", "BufferGeometry", "geometry", "primitive", "vertices"],
  docs: ["repo/docs/components/geometry.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
