// Chart.js example: options.animations with loop: true on one property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animate a single property on a loop',
  summary:
    'A heart-rate line that never sits still: its curve, its point size or its thickness pulses between two values forever. Name the property under animations and give it from, to and loop: true.',
  section: 'Configuration',
  tags: ['animation', 'animations', 'loop', 'tension', 'line', 'options.animations'],
  docs: ['repo/docs/configuration/animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
