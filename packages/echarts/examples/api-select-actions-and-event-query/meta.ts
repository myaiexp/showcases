// echarts example: select actions, selectchanged and on with a query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'select actions, selectchanged and on with a query',
  summary:
    'Drive selection from code with the select, unselect and toggleSelect actions, and watch the selectchanged event report what changed. Attach and detach listeners with on(eventName, query, handler) and off(eventName, handler), filtered by series name or by component type.',
  section: 'API',
  tags: ['dispatchAction', 'select', 'unselect', 'toggleSelect', 'selectchanged', 'on', 'off', 'query', 'selectedMode'],
  docs: ['repo/en/api/action.md', 'repo/en/api/events.md', 'repo/en/api/echarts-instance.md', 'repo/en/option/series/bar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
