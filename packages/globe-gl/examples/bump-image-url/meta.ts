// globe-gl example: Globe: bumpImageUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: bumpImageUrl",
  summary:
    "bumpImageUrl loads a grey-scale height image as the globe material's bump map, so land picks up rough relief in the light while the sphere stays smooth. Left: the atlas image alone; right: the same image with a bump map, seen from the same moving camera.",
  section: "Globe Layer",
  tags: ["bumpImageUrl", "globeImageUrl"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
