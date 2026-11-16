// aframe example: emit(): events bubble to parent entities unless bubbles is false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'emit(): events bubble to parent entities unless bubbles is false',
  summary:
    'A child entity emits sink with detail; the parent\'s listener hears it because emit bubbles by default. Passing false as the third argument keeps the event on the child. The board logs who heard what.',
  section: 'Core API',
  tags: ['emit', 'bubbles', 'addEventListener', 'event detail'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
