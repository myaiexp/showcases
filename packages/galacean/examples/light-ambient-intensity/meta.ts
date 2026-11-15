// galacean example: Ambient diffuse and specular intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient diffuse and specular intensity",
  summary:
    "The two ambient intensities from the docs' script comments: diffuseIntensity scales the spherical-harmonic diffuse light and specularIntensity the reflections. The card sweeps one after the other.",
  section: "Light",
  tags: ['AmbientLight', 'diffuseIntensity', 'specularIntensity'],
  docs: [
    'repo/docs/en/graphics/light/ambient.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
