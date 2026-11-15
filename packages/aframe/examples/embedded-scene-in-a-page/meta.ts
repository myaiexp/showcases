// aframe example: embedded: a scene that sits in the page layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "embedded: a scene that sits in the page layout",
  summary: "The embedded component drops A-Frame's fullscreen canvas styling, so the a-scene is sized like a div by CSS. Here a heading, a paragraph and a button share a page with a 230 pixel tall scene inside a wrapper, and the HTML button changes the box's colour, which is how the docs say an embedded scene can interact with the 2D page.",
  section: 'Components',
  tags: ["embedded", "a-scene", "CSS", "a-box", "setAttribute", "2D page"],
  docs: ["repo/docs/components/embedded.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
