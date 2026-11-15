// Motion: values that read t move the scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Motion: values that read t move the scene",
  summary: "A value that reads t, the time in seconds, makes the scene move, and view: 60t spins the camera in place. Here a box turns with t and a sphere orbits it, while the camera turns the other way.",
  section: "Scenes",
  tags: ["@scene", "t", "rotate", "view", "move"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
