// vega example: View: preventDefault
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Preventing Default Event Behavior',
  summary:
    'A cancelable wheel, click and mousemove is sent to six views set up with view.preventDefault and the spec events config, and a table shows which Vega cancelled: the flag only takes effect once the default config\'s allow-wheel rule is emptied.',
  section: 'View API',
  tags: ['view.preventDefault', 'config.events', 'signal.on'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/docs/config.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
