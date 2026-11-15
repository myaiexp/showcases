// globe-gl example: Arcs: line or tube
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: line or tube",
  summary:
    "Two globes, the same links: arcStroke null gives a Three.js Line that stays 1px wide at any zoom, a number gives a tube whose diameter is in angular degrees. A slider sets the tube diameter.",
  section: "Arcs Layer",
  tags: ['arcStroke', 'arcColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
