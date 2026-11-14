// deck-gl example: Shadows moving with SunLight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadows moving with SunLight',
  summary:
    "A SunLight with _shadow: true casts shadows that rotate as the timestamp advances through a day: the whole block is lit by one effect whose only input is the time. Play, pause or scrub the time.",
  section: 'Effects and lighting',
  tags: ['_SunLight', 'SunLight', '_shadow', 'timestamp', 'shadowEnabled'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/sun-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
