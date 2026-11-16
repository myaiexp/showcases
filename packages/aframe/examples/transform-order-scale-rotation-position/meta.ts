// aframe example: position, rotation, scale: the order transformations apply
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "position, rotation, scale: the order transformations apply",
  summary: "Transformations apply scale first, then rotation, then position. A long bar with scale 3 1 1, rotation 0 0 45 and position 2 0 0 is built three ways: as one entity, as nested entities in that order (scale inside, position outside), which matches, and with rotation and scale swapped, which shears it.",
  section: 'Components',
  tags: ["position", "rotation", "scale", "order of transformations", "nested entities"],
  docs: ["repo/docs/components/position.md", "repo/docs/components/rotation.md", "repo/docs/components/scale.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
