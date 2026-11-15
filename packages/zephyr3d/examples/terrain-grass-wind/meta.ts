// zephyr3d example: Wind on terrain grass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wind on terrain grass",
  summary:
    "scene.env.wind (direction in degrees, strength, gustStrength, gustScale) moves every grass layer; a card layer also has windLean, swayAmplitude and swaySpeed of its own.",
  section: "Environment",
  tags: ['env.wind', 'direction', 'strength', 'gustStrength', 'gustScale', 'windLean', 'swayAmplitude', 'swaySpeed', 'grassRenderer'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
