// aframe example: ECS on the DOM: attribute selectors and events between components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ECS on the DOM: attribute selectors and events between components',
  summary:
    'Entities carry enemy and alive components. [enemy]:not([alive]) finds the dead ones, and when alive is removed it emits died, which bubbles to a scoreboard component on the scene that counts it without knowing who sent it.',
  section: 'Introduction',
  tags: ['attribute selector', 'querySelectorAll', 'emit', 'removeAttribute', 'publish-subscribe'],
  docs: ['repo/docs/introduction/entity-component-system.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
