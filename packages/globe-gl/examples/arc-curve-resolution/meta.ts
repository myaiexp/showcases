// globe-gl example: Arcs: curve resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: curve resolution",
  summary:
    "Two globes: the left builds each arc from 4 straight segments (visible corners), the right from the default 64. A slider changes the left one.",
  section: "Arcs Layer",
  tags: ['arcCurveResolution', 'arcStroke'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
