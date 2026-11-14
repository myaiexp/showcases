// deck-gl example: warp shader passes as PostProcessEffects with a moving centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect: swirl and bulge',
  summary:
    "The warp modules swirl and bulgePinch from @luma.gl/effects as PostProcessEffects. Their centre follows the pointer (a card orbits it on a timer) and a slider sets the swirl angle or bulge strength, all through effect.setProps.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'swirl', 'bulgePinch', 'setProps', 'pointer', '@luma.gl/effects'],
  docs: [
    'repo/docs/api-reference/core/post-process-effect.md',
    'repo/docs/developer-guide/using-effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
