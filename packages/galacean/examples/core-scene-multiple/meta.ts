// galacean example: Scene: several scenes at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene: several scenes at once",
  summary:
    "Two scenes, each with its own entity tree and camera, rendered by one engine side by side through camera viewports. addScene and removeScene switch the second one on and off.",
  section: "Core",
  tags: ['SceneManager', 'addScene', 'removeScene', 'scenes', 'Scene'],
  docs: [
    'repo/docs/en/core/scene.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
