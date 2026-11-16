// aframe example: flushToDOM(): write component data back to the HTML attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'flushToDOM(): write component data back to the HTML attributes',
  summary:
    'setAttribute changes component data in memory but leaves the element\'s attribute text alone. flushToDOM() serialises one entity, and flushToDOM(true) also its children, so the board shows the DOM catching up.',
  section: 'Core API',
  tags: ['flushToDOM', 'recursive', 'getAttribute', 'material'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/components/debug.md', 'repo/docs/introduction/faq.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
