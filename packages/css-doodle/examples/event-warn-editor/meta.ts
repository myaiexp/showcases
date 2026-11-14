// warn: listen for problems in the code and show them in your own editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Catching warn events',
  summary:
    'A doodle typed a line at a time, with an unclosed parenthesis and an unknown function along the way. Each problem arrives as a warn event with its message (and place); the listener calls preventDefault() to keep it out of the console and shows it under the code instead, as the docs suggest for an editor.',
  section: 'Events',
  tags: ['warn', 'preventDefault()', 'diagnostics'],
  docs: ['pages/css-doodle-com/reference/event-warn.md', 'pages/css-doodle-com/reference/js-api-diagnostics.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
