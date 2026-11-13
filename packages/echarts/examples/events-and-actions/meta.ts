// echarts example: Events and dispatchAction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events and dispatchAction',
  summary:
    'Listen to click, mouseover (with a series query), globalout and legend events and watch them in a live log; dispatchAction highlights bars and shows tooltips from code.',
  section: 'Concepts',
  tags: ['on', 'off', 'click', 'mouseover', 'globalout', 'legendselectchanged', 'dispatchAction', 'highlight', 'showTip'],
  docs: [
    'repo/contents/en/concepts/event.md',
    'repo/en/api/events.md',
    'repo/en/api/action.md',
    'repo/en/api/echarts-instance.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
