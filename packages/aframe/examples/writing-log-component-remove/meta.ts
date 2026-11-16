// aframe example: Writing a component: handle removal with remove()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a component: handle removal with remove()',
  summary:
    'The log component\'s remove handler removes its event listener, so after removeAttribute(\'log\') emitting the event does nothing; setting the attribute again brings it back.',
  section: 'Introduction',
  tags: ['remove', 'removeAttribute', 'removeEventListener'],
  docs: ['repo/docs/introduction/writing-a-component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
