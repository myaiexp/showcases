// deck-gl example: chaining several PostProcessEffects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect: chaining several effects',
  summary:
    "Four PostProcessEffects (hueSaturation, sepia, vignette, noise from @luma.gl/effects) live in one Deck's effects array. Checkboxes decide which are in the array, so they run in that order, each on the previous one's output; two sliders change an effect's props with setProps.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'effects', 'sepia', 'vignette', 'hueSaturation', 'noise', '@luma.gl/effects'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/post-process-effect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
