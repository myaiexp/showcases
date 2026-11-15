// aframe example: material: magFilter nearest and linear on a magnified texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "material: magFilter nearest and linear on a magnified texture",
  summary: "A tiny 4x4 painted texture is stretched across two planes. magFilter: nearest keeps hard pixels where linear blurs them between texels. Selects switch each plane's filter live; minFilter and anisotropy are the matching properties for minified textures.",
  section: 'Components',
  tags: ["material", "magFilter", "nearest", "linear", "linear-mipmap-linear", "anisotropy"],
  docs: ["repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
