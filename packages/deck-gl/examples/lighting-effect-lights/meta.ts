// deck-gl example: LightingEffect with ambient and directional lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LightingEffect with ambient and directional lights',
  summary:
    "A LightingEffect built from an AmbientLight and one DirectionalLight replaces deck.gl's default lighting on extruded buildings. A checkbox swaps back to the default effect to compare.",
  section: 'Effects and lighting',
  tags: ['LightingEffect', 'AmbientLight', 'DirectionalLight', 'effects', 'material'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/ambient-light.md',
    'repo/docs/api-reference/core/directional-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
