// deck-gl example: PostProcessEffect with brightnessContrast from @luma.gl/effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PostProcessEffect: brightness and contrast',
  summary:
    "A PostProcessEffect built from @luma.gl/effects' brightnessContrast shader module, as the docs show, with brightness and contrast changed from sliders through effect.setProps and deck.redraw. The ArcLayer turns on its own antialiasing because the effect renders offscreen without MSAA.",
  section: 'Effects and lighting',
  tags: ['PostProcessEffect', 'brightnessContrast', '@luma.gl/effects', 'setProps', 'shader pass'],
  docs: [
    'repo/docs/api-reference/core/post-process-effect.md',
    'repo/docs/developer-guide/using-effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
