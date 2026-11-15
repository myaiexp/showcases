// A first @scene: a rounded box and a view row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A first @scene: a rounded box and a view row",
  summary: "The body of @scene is a list of shapes, each written name { … }, and rows such as view: 35 25. A box with size: 1 and round: .1 is rendered by raymarching into an image; view turns the camera 35 degrees around y and tilts it 25 down. The variants turn the camera.",
  section: "Scenes",
  tags: ["@scene", "box", "size", "round", "fill", "view"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
