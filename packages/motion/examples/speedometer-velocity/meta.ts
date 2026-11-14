// motion example: Speedometer for any value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Speedometer for any value',
  summary: 'A slider handle that glides along a track while a gauge beside it shows how fast it is moving right now. Every motion value knows its current value (get) and its speed (getVelocity), here read each frame to swing the needle.',
  section: 'Motion values',
  tags: ['motionValue', 'get', 'getVelocity', 'styleEffect', 'mapValue', 'frame.update'],
  docs: ['pages/motion-dev/docs/motion-value.md', 'pages/motion-dev/docs/map-value.md', 'pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/frame.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
