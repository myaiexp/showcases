// vega example: Utilities: debounce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: Debounce',
  summary:
    'A scrolling timeline of calls (grey) against the invocations of a vega.debounce-d function (orange): each burst of calls yields one invocation after the quiet delay, which a slider changes.',
  section: 'Util',
  tags: ['util.debounce'],
  docs: ['repo/docs/docs/api/util.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
