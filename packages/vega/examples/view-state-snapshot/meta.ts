// vega example: View: State Snapshots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: getState and setState',
  summary:
    'Change two bound signals and add dots with view.insert, then restore the earlier snapshot with view.setState: a console reports what getState captured, including the data set modified through the View API.',
  section: 'View API',
  tags: ['view.getState', 'view.setState', 'view.insert', 'signal.bind'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/docs/api/debugging.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
