// galacean example: Particle snow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle snow",
  summary:
    "Snow falling from a wide BoxShape above the view: slow gravity, random sizes and a wind from forceOverLifetime that swings left and right. A wind slider in the full view.",
  section: "Particle",
  tags: ['BoxShape', 'forceOverLifetime', 'gravityModifier', 'startSize'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
    'repo/docs/en/graphics/particle/renderer-force-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
