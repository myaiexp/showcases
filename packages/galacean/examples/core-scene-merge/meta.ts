// galacean example: Scene: mergeScenes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene: mergeScenes",
  summary:
    "Two scenes built apart are folded into one with mergeScenes(source, dest), then the destination is added to the engine. Every root entity of the source ends up in the destination.",
  section: "Core",
  tags: ['SceneManager', 'mergeScenes', 'addScene', 'Scene'],
  docs: [
    'repo/docs/en/core/scene.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
