// aframe example: Binding event listeners: arrow function, events object, bound method
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Binding event listeners: arrow function, events object, bound method',
  summary:
    'A click is handled four ways inside one component: an arrow function, the events object and a bound method all see the component\'s this; a plain function sees the element instead. The board shows which got what.',
  section: 'Introduction',
  tags: ['events', 'bind', 'arrow function', 'this', 'addEventListener'],
  docs: ['repo/docs/introduction/javascript-events-dom-apis.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
