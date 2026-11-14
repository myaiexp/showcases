// motion example: Paper plane flying a figure of eight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paper plane flying a figure of eight',
  summary: 'A paper plane loops a figure of eight and always points where it is heading, with a wobble you can dial up. Position and heading are separate motion values; transformValue composes them into a single transform string, and even builds one transformValue from another.',
  section: 'Motion values',
  tags: ['transformValue', 'compose', 'styleEffect', 'motionValue', 'animate'],
  docs: ['pages/motion-dev/docs/transform-value.md', 'pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
