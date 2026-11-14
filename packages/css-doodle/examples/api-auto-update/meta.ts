// autoUpdate() and cancelAutoUpdate(): periodic re-rendering from JavaScript
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'autoUpdate() and cancelAutoUpdate()',
  summary:
    'doodle.autoUpdate(\'1.2s\') re-renders the doodle on a timer, with a new seed each time; calling it again restarts the timer with the new interval (a number of ms, or a string with ms, s or m, at least 500). cancelAutoUpdate() stops it. The interval is kept in a data-interval attribute, which the caption reads.',
  section: 'Element API',
  tags: ['autoUpdate()', 'cancelAutoUpdate()', 'data-interval', 'update'],
  docs: ['pages/css-doodle-com/reference/js-api-auto-update.md', 'pages/css-doodle-com/reference/event-update.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
