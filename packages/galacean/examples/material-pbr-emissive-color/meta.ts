// galacean example: PBR emissive colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PBR emissive colour",
  summary: "Spheres in a dark room with no lights: only emissiveColor makes them visible, and it keeps its colour whatever the lighting. The card pulses the glow; the full view has a picker.",
  section: "Material",
  tags: ['PBRMaterial','emissiveColor'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
