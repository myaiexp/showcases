// aframe example: material: a canvas as a texture, refreshed each frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: a canvas as a texture, refreshed each frame",
  summary: "A <canvas> in <a-assets> is the material's src. A component draws on it every tick and sets the texture's needsUpdate, since the docs say a modified canvas has to be refreshed. The result is a live oscilloscope on a screen and a clock face on a cylinder.",
  section: 'Components',
  tags: ["material", "src", "canvas", "needsUpdate", "registerComponent", "tick", "canvas texture"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
