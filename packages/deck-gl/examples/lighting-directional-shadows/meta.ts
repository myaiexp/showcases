// deck-gl example: Shadows from a DirectionalLight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadows from a DirectionalLight',
  summary:
    "Setting _shadow: true on a DirectionalLight makes buildings cast shadows onto each other and the ground. Toggle the shadow, change the LightingEffect's shadowColor, or give the ground layer shadowEnabled: false.",
  section: 'Effects and lighting',
  tags: ['_shadow', 'shadowColor', 'shadowEnabled', 'DirectionalLight', 'LightingEffect'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',
    'repo/docs/api-reference/core/directional-light.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
