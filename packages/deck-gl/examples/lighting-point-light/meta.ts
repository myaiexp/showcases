// deck-gl example: PointLight position and attenuation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PointLight position and attenuation',
  summary:
    "A PointLight flying between the buildings lights nearby facades and falls off with distance. Its position is [longitude, latitude, altitude] in a map view and attenuation [1, 0, n] sets how fast it fades.",
  section: 'Effects and lighting',
  tags: ['PointLight', 'position', 'attenuation', 'intensity', 'LightingEffect'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/point-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
