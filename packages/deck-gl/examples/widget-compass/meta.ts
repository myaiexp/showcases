// deck-gl example: CompassWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CompassWidget',
  summary:
    'A compass that turns with the map bearing and tilts with its pitch. One click levels the bearing, a second click levels the pitch; onReset reports each step. The view state is controlled so the reset lands in onViewStateChange.',
  section: 'Widgets',
  tags: ['CompassWidget', 'onReset', 'transitionDuration', 'viewState', 'onViewStateChange'],
  docs: [
    'repo/docs/api-reference/widgets/compass-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
