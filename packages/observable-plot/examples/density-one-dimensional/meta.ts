// observable-plot example: Density: one-dimensional
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: one-dimensional",
  summary: "With only x given, the density mark estimates a one-dimensional density and draws it as vertical bands; here a bandwidth of 10 over the waiting times, two stroke weights and dots along the axis.",
  section: 'Mark: Density',
  tags: ['density', 'bandwidth', 'thresholds', 'strokeWidth'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/faithful.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
