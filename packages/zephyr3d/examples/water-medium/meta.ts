// zephyr3d example: The water medium: absorption and scattering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The water medium: absorption and scattering",
  summary:
    "Water colour comes from per-metre absorption and scattering coefficients (1/m per channel). Compare clear pool water with turbid sea water, and scale both at once with absorptionScale and scatteringScale.",
  section: "Environment",
  tags: ['absorption', 'scattering', 'absorptionScale', 'scatteringScale', 'Water'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
