// aframe example: animation: read components.animation.animation and config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: read components.animation.animation and config",
  summary: "The animation component exposes its anime.js object as animation and the config it passed to anime.js as config. The read-out prints the config keys and the anime.js object's progress, updated several times a second while a sphere bobs.",
  section: 'Components',
  tags: ["animation", "components.animation.animation", "components.animation.config", "anime.js"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
