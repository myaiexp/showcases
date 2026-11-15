// globe-gl example: Paths: dash animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: dash animation",
  summary:
    "Dashes travel along fat paths from first point to last. Sliders set the dash length, the gap, the initial gap and the time a dash takes to cross a whole path (0 stops it).",
  section: "Paths Layer",
  tags: ['pathDashLength', 'pathDashGap', 'pathDashInitialGap', 'pathDashAnimateTime', 'pathStroke'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
