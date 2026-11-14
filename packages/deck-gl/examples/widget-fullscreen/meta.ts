// deck-gl example: FullscreenWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FullscreenWidget',
  summary:
    'A button that takes the map container fullscreen and back, with custom enter and exit labels. onFullscreenChange reports the state, also when Esc leaves fullscreen.',
  section: 'Widgets',
  tags: ['FullscreenWidget', 'container', 'enterLabel', 'exitLabel', 'onFullscreenChange'],
  docs: [
    'repo/docs/api-reference/widgets/fullscreen-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
