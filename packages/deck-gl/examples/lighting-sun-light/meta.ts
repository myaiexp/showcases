// deck-gl example: SunLight from a timestamp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SunLight from a timestamp',
  summary:
    "The experimental _SunLight turns a timestamp into a sun direction for the scene's location. A time-of-day slider moves the sun across the sky over the block, with the slider's UTC timestamp printed beside it.",
  section: 'Effects and lighting',
  tags: ['_SunLight', 'SunLight', 'timestamp', 'LightingEffect'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/sun-light.md',
    'repo/docs/api-reference/core/ambient-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
