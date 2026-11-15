// globe-gl example: Paths: colour gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: colour gradient",
  summary:
    "Left: pathColor returns an array of colours blended along each path. Right: it returns a function of t, 0 at the first point and 1 at the last, here sweeping the hue.",
  section: "Paths Layer",
  tags: ['pathColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
