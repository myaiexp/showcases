// postprocessing example: GlitchEffect dtSize for the generated noise map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: dtSize',
  summary:
    'Without a perturbationMap, GlitchEffect generates a square noise texture of dtSize pixels per side (64 by default). A tiny map gives coarse, repetitive displacement; a large one gives fine-grained scatter. dtSize is only a constructor option, so changing it builds a new effect.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'dtSize', 'perturbationMap', 'removePass'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/textures/NoiseTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
