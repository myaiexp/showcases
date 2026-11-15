// zephyr3d example: Directional scattering and anisotropy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Directional scattering and anisotropy",
  summary:
    "sunScatteringIntensity makes the water body lit per light, so a low sun tints it; scatterAnisotropy sets the phase function (0 isotropic, 0.7 near sea water). Shown on a milky, turbid medium.",
  section: "Environment",
  tags: ['sunScatteringIntensity', 'scatterAnisotropy', 'scattering', 'Water'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
