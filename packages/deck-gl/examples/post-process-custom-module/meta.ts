// deck-gl example: PostProcessEffect with a custom shader module
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect with a custom shader module',
  summary:
    "A PostProcessEffect built from a small hand-written filter module (a duotone that maps brightness onto two colours), because @luma.gl/effects is not installed. Its amount is changed live through the effect's setProps.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'shader module', 'filter', 'effects', 'setProps'],
  docs: [
    'repo/docs/developer-guide/using-effects.md',
    'repo/docs/api-reference/core/post-process-effect.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
