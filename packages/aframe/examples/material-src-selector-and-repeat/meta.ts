// aframe example: material: src from an asset <img>, with repeat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: src from an asset <img>, with repeat",
  summary: "A texture comes in through src: a selector pointing at an <img> in <a-assets>. The repeat property tiles it, shown on a floor plane with a slider for each axis. The colour multiplies the texture per pixel, so it stays #fff to keep the original.",
  section: 'Components',
  tags: ["material", "src", "repeat", "a-assets", "img", "selector", "color"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
