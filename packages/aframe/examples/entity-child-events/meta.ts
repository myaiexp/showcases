// aframe example: child-attached and child-detached: events when children come and go
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'child-attached and child-detached: events when children come and go',
  summary:
    'Appending an <a-box> to a parent with appendChild fires child-attached, and removeChild fires child-detached; the listener reads evt.detail.el. The board in the scene logs each one.',
  section: 'Core API',
  tags: ['child-attached', 'child-detached', 'appendChild', 'removeChild', 'detail.el'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
