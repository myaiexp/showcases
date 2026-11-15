// globe-gl example: Arcs: altitude, automatic or fixed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: altitude, automatic or fixed",
  summary:
    "Two globes with the same links. With arcAltitude null the peak scales with the distance between the ends; with a number every arc peaks at that many globe radii. A slider moves the fixed peak.",
  section: "Arcs Layer",
  tags: ['arcAltitude', 'arcStroke'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
