// globe-gl example: Rings: colour gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rings: colour gradient",
  summary:
    "Left: ringColor returns an array of colours blended from the centre to the maximum radius. Right: it returns a function of t that fades the ring out as it grows.",
  section: "Rings Layer",
  tags: ['ringColor', 'ringMaxRadius', 'ringPropagationSpeed'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
