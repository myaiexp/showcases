// aframe example: shadow: scene-wide type, autoUpdate and enabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shadow: scene-wide type, autoUpdate and enabled",
  summary: "The shadow system is configured on the <a-scene>: type picks pcf or basic filtering, autoUpdate decides whether the shadow map is recomputed every frame (freeze it and moving objects leave stale shadows), and enabled switches shadows off for the whole scene. Controls set each on the scene.",
  section: 'Components',
  tags: ["shadow", "type", "pcf", "basic", "autoUpdate", "enabled", "scene"],
  docs: ["repo/docs/components/shadow.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
