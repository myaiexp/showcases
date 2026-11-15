// aframe example: light: spot angle, penumbra and target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: spot angle, penumbra and target",
  summary: "A spot light aimed with target at a box sweeps a cone over the floor. angle sets the cone's half-width in degrees and penumbra softens its edge; sliders change both, and the light keeps pointing at the target as the target moves.",
  section: 'Components',
  tags: ["light", "spot", "angle", "penumbra", "target", "distance", "decay"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
