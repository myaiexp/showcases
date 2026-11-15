// Shapes: a cylinder and a cone make a pencil
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shapes: a cylinder and a cone make a pencil",
  summary: "Each shape takes its own sizes: a cylinder has r and height along y, a cone has r: bottom top and height. The camera pulls back to fit the model but never comes closer. move: 0 .7 0 lifts the cone on top of the cylinder, and view: 60t 20 turns the camera slowly around it.",
  section: "Scenes",
  tags: ["@scene", "cylinder", "cone", "move", "height"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
