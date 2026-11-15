// light and shadow: a direction and a shadow strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light and shadow: a direction and a shadow strength",
  summary: "One light shines from the upper right. light: x y z moves it to that direction, in the axes of normal, so it turns with the camera, and shadow, from 0 to 1, lets shapes block it. The variants raise the shadow from none to full.",
  section: "Scenes",
  tags: ["@scene", "light", "shadow", "sphere"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
