// aframe example: <a-box>: width, height, depth, segments and a texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "<a-box>: width, height, depth, segments and a texture",
  summary:
    "The <a-box> primitive maps width, height and depth to the box geometry and color or src to its material. The docs' tall tomato box stands beside a box textured through <a-assets> and a wireframe box whose segments-width, -height and -depth split each face.",
  section: 'Primitives',
  tags: ["a-box", "width", "height", "depth", "segments-width", "src", "wireframe", "a-assets"],
  docs: ["repo/docs/primitives/a-box.md", "repo/docs/components/geometry.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
