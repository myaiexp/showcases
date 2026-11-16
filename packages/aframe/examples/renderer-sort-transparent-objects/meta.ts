// aframe example: renderer: sortTransparentObjects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "renderer: sortTransparentObjects",
  summary: "Three overlapping transparent panels are listed in the markup nearest-first, so by default the far ones draw after the near ones and show through wrongly while the camera drifts. renderer sortTransparentObjects: true, which can be flipped at runtime, sorts them far to near. A toggle switches it.",
  section: 'Components',
  tags: ["renderer", "sortTransparentObjects", "transparent", "opacity", "material", "render order"],
  docs: ["repo/docs/components/renderer.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
