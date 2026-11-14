// deck-gl example: the magnify pass as a PostProcessEffect lens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect: magnify lens',
  summary:
    "The magnify module from @luma.gl/effects as a PostProcessEffect: a circular lens with screenXY, radiusPixels, zoom and a border. It follows the pointer (a card moves it on a timer) and three sliders change its props through effect.setProps.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'magnify', 'lens', 'setProps', 'pointer', '@luma.gl/effects'],
  docs: [
    'repo/docs/api-reference/core/post-process-effect.md',
    'repo/docs/developer-guide/using-effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
