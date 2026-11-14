// motion example: Colour fade between moods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sky colour that eases through the day',
  summary: 'A weather card whose sky fades from dawn to noon to dusk to night. animate() takes two colours and sends every in-between colour to onUpdate, and you paint it wherever you like.',
  section: 'animate',
  tags: ['animate', 'single values', 'colour', 'onUpdate', 'duration'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
