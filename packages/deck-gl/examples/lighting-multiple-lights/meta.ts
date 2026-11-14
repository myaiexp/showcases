// deck-gl example: Several lights in one LightingEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Several lights in one LightingEffect',
  summary:
    "LightingEffect accepts any number of lights under arbitrary keys: one ambient, two coloured directional lights and two point lights are sorted by type. Toggle each light to see its contribution.",
  section: 'Effects and lighting',
  tags: ['LightingEffect', 'AmbientLight', 'DirectionalLight', 'PointLight', 'lights'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/ambient-light.md',
    'repo/docs/api-reference/core/directional-light.md',
    'repo/docs/api-reference/core/point-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
