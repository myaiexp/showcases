// motion example: Thermostat dial that maps temperature to colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Thermostat dial that maps temperature to colour',
  summary: 'A thermostat whose ring colour, needle angle and one-word mood all come from the same temperature. transform() maps the input range to colours and numbers, and with clamp: false it keeps extrapolating past the ends instead of stopping.',
  section: 'Utils',
  tags: ['transform', 'clamp: false', 'colour', 'multi-stop'],
  docs: ['pages/motion-dev/docs/transform.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
