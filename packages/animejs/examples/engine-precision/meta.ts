// animejs example: engine.precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine precision readout',
  summary:
    'engine.precision sets how many decimals string values are rounded to while animating. The slider changes it and a readout shows the resulting transform string of one particle.',
  section: 'Engine',
  tags: ['engine', 'engine.precision', 'animate', 'transform'],
  docs: [
    'pages/animejs-com/documentation/engine/engine-parameters/precision.md',
    'pages/animejs-com/documentation/engine/engine-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
