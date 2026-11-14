// deck-gl example: Material props on extruded layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Material props on extruded layers',
  summary:
    "The material prop of an extruded PolygonLayer sets how it answers the global lighting: ambient, diffuse, shininess and specularColor sliders, plus material: true for the defaults and material: false to switch lighting off.",
  section: 'Effects and lighting',
  tags: ['material', 'ambient', 'diffuse', 'shininess', 'specularColor', 'PolygonLayer'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/lighting-effect.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
