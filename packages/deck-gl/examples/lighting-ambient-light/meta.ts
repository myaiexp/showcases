// deck-gl example: AmbientLight colour and intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AmbientLight colour and intensity',
  summary:
    "A LightingEffect holding only an AmbientLight: every face of every building gets the same brightness, so the skyline is flat. Change the intensity and colour to see what ambient light does and does not show.",
  section: 'Effects and lighting',
  tags: ['AmbientLight', 'LightingEffect', 'color', 'intensity'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/ambient-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
