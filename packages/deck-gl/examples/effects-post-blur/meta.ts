// deck-gl example: blur shader passes as PostProcessEffects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect: blur passes',
  summary:
    "The blur modules exported by @luma.gl/effects (gaussianBlur, triangleBlur, zoomBlur, tiltShift) as PostProcessEffects over a map of cities and labels. A select picks the module and a slider scales its radius, strength or blurRadius.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'gaussianBlur', 'triangleBlur', 'zoomBlur', 'tiltShift', '@luma.gl/effects'],
  docs: [
    'repo/docs/api-reference/core/post-process-effect.md',
    'repo/docs/developer-guide/using-effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
