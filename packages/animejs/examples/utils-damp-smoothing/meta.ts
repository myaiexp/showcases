// Utilities example: Utils damp() frame-rate independent smoothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utils damp() frame-rate independent smoothing',
  summary: 'A stepped clock is followed by two smoothed clocks running at 15 fps: one eased with lerp() and one with damp() using the real delta time. A slider changes the amount and a readout shows all three angles.',
  section: 'Utilities',
  tags: ['utils.damp', 'utils.lerp', 'createTimer', 'frameRate'],
  docs: [
    'pages/animejs-com/documentation/utilities/damp.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
