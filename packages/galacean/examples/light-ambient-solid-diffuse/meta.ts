// galacean example: Ambient solid colour diffuse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient solid colour diffuse",
  summary:
    "The editor's \"Solid Color\" diffuse source as script: AmbientLight with diffuseMode = DiffuseMode.SolidColor lights every surface evenly from one colour, with no direct light in the scene.",
  section: "Light",
  tags: ['AmbientLight', 'DiffuseMode', 'diffuseSolidColor', 'diffuseIntensity'],
  docs: [
    'repo/docs/en/graphics/light/ambient.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
