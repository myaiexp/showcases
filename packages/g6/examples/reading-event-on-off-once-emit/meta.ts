// g6 example: Events: on, off, once and emit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: on, off, once and emit',
  summary: 'A custom event name with on, once, off and emit: once fires a single time, on keeps firing until off removes it, and off() with no arguments removes every listener.',
  section: 'Further Reading',
  tags: ['on', 'off', 'once', 'emit'],
  docs: [
    'repo/packages/site/docs/manual/further-reading/event.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
