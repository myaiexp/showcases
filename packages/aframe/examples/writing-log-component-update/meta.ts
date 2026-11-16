// aframe example: Writing a component: handle property updates with update(oldData)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a component: handle property updates with update(oldData)',
  summary:
    'log gains an event property and moves its work to update, which compares oldData to remove the old event listener and add the new one. Emit the events, then change event and message with setAttribute.',
  section: 'Introduction',
  tags: ['update', 'oldData', 'emit', 'addEventListener', 'removeEventListener'],
  docs: ['repo/docs/introduction/writing-a-component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
