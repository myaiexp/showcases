// deck-gl example: DirectionalLight direction and colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DirectionalLight direction and colour',
  summary:
    "A DirectionalLight shades each facade by the angle to a distant light. Sliders set the azimuth and height of the direction vector, and a select changes the colour, with a faint AmbientLight keeping the shadow sides visible.",
  section: 'Effects and lighting',
  tags: ['DirectionalLight', 'direction', 'color', 'intensity', 'LightingEffect'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/directional-light.md',
    'repo/docs/api-reference/core/ambient-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
