// galacean example: PBR refraction mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR refraction mode",
  summary: "The same glass seen as a sphere and as a flat slab: RefractionMode.Sphere bends the view the way a ball would, RefractionMode.Planar the way a pane does. Each shape is drawn in both modes.",
  section: "Material",
  tags: ['PBRMaterial','refractionMode','RefractionMode'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
