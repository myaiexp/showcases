// galacean example: Scene: destroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene: destroy",
  summary:
    "scene.destroy() releases a scene and drops it from engine.sceneManager.scenes by itself; a scene counter shows the list shrinking.",
  section: "Core",
  tags: ['Scene', 'destroy', 'scenes', 'SceneManager'],
  docs: [
    'repo/docs/en/core/scene.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
