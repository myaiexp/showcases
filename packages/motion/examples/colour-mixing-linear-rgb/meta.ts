// motion example: Colour blend without the muddy middle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour blend without the muddy middle',
  summary: 'Two strips fade between the same two colours. A normal CSS gradient dips into a dark, dull middle, while a strip built from mix() stays bright because Motion blends RGB colours in linear RGB. Drag the marker to read any colour in between.',
  section: 'Utils',
  tags: ['mix', 'linear RGB', 'colour'],
  docs: ['pages/motion-dev/docs/mix.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
