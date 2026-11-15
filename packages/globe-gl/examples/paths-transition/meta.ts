// globe-gl example: Paths: data transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: data transition",
  summary:
    "A new set of random paths replaces the old one every few seconds; new paths draw themselves from start to end. A slider sets pathTransitionDuration, 0 jumps at once.",
  section: "Paths Layer",
  tags: ['pathsData', 'pathTransitionDuration'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
