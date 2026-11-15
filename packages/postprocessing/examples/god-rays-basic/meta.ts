// postprocessing example: God rays: basic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: basic',
  summary:
    "GodRaysEffect streaks light from a bright mesh outwards, and the pillars and ring in front of it cut the streaks into shafts. The light source must be a Mesh or Points; the effect makes its material transparent and stops it writing depth.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'lightSource', 'godRaysMaterial'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
