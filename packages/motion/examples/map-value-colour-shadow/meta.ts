// motion example: Thermostat that glows with the temperature
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Thermostat that glows with the temperature',
  summary: 'A thermostat tile whose colour, glow and thermometer level all follow one temperature. mapValue turns a single number into colours across several stops and into a box-shadow string, as long as every stop has the same shape.',
  section: 'Motion values',
  tags: ['mapValue', 'styleEffect', 'colour', 'box-shadow', 'motionValue'],
  docs: ['pages/motion-dev/docs/map-value.md', 'pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/motion-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
