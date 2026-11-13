// animejs example: engine.timeUnit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine timeUnit seconds and milliseconds',
  summary:
    'Two looping timers with duration 1 and duration 1000. Switching engine.timeUnit between ms and s changes which one takes one second, and the default duration follows.',
  section: 'Engine',
  tags: ['engine', 'engine.timeUnit', 'engine.defaults', 'createTimer', 'iterationCurrentTime', 'utils.roundPad'],
  docs: [
    'pages/animejs-com/documentation/engine/engine-parameters/timeunit-seconds-milliseconds.md',
    'pages/animejs-com/documentation/engine/engine-defaults.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
