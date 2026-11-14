// vchart example: Events: throttle and debounce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: throttle and debounce",
  summary:
    "Ten clicks fired 60 ms apart reach a plain listener, a { throttle: 300 } listener and a { debounce: 300 } listener; the counters show ten, a few, and one.",
  section: "Events",
  tags: ['throttle','debounce','EventQuery','on'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
