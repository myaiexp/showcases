// globe-gl example: Paths: thin line or fat line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: thin line or fat line",
  summary:
    "Two globes, the same paths: pathStroke null gives a Three.js Line that stays 1px wide, a number gives a fat line whose width is in angular degrees and scales with zoom. A slider sets the width.",
  section: "Paths Layer",
  tags: ['pathStroke', 'pathColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
