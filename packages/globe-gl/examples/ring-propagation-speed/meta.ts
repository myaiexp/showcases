// globe-gl example: Rings: propagation speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rings: propagation speed",
  summary:
    "Two globes with the same cities: on the left rings spread outwards at 6 degrees a second, on the right a negative speed makes them start at the maximum radius and collapse to the centre. Sliders change both.",
  section: "Rings Layer",
  tags: ['ringPropagationSpeed', 'ringMaxRadius'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
