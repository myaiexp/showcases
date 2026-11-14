// deck-gl example: GimbalWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GimbalWidget',
  summary:
    'Nested rings that mirror the rotation of an OrbitView. Clicking them resets rotationOrbit and rotationX to 0; onReset reports the new values.',
  section: 'Widgets',
  tags: ['GimbalWidget', 'OrbitView', 'strokeWidth', 'onReset', 'rotationOrbit', 'rotationX'],
  docs: [
    'repo/docs/api-reference/widgets/gimbal-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
