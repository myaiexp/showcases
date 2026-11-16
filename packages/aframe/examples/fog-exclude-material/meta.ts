// aframe example: fog: material=fog: false keeps an entity out of the fog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fog: material=fog: false keeps an entity out of the fog",
  summary: "Two identical rows of spheres recede into linear fog. The back row's materials use fog: false, so they keep their full colour at any distance while the front row fades. A toggle flips fog on the first sphere's material.",
  section: 'Components',
  tags: ["fog", "material", "fog: false", "linear"],
  docs: ["repo/docs/components/fog.md", "repo/docs/components/material.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
