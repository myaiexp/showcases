// l7 example: on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on and off",
  summary:
    "Two click listeners bound with on: one keeps counting, the other removes itself with off after three clicks and stays quiet after that. (scene.once with map events such as click never fires in 2.29.1.)",
  section: 'Scene',
  tags: ["on", "off", "click"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
