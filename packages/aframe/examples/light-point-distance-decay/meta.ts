// aframe example: light: point light distance and decay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: point light distance and decay",
  summary: "A point light hangs over a row of white boxes. distance is where its intensity reaches zero (0 means no falloff) and decay is how fast it dims along the way; sliders change both and the pool of light on the floor grows or shrinks.",
  section: 'Components',
  tags: ["light", "point", "distance", "decay", "intensity"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
