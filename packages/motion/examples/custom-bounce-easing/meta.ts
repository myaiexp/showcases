// motion example: Parcel that lands with a bounce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parcel that lands with a bounce',
  summary: 'A delivery drops onto a shelf and rebounds a few times before settling. Motion has no bounce easing built in, but ease accepts any JavaScript function that takes progress from 0 to 1 and returns the eased value, so the bounce is a six-line function. The shadow uses the same function.',
  section: 'Easing',
  tags: ['ease', 'custom easing', 'function', 'animate'],
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/easing-functions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
