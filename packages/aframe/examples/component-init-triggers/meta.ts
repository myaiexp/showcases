// aframe example: When init runs: markup, setAttribute on an attached entity, appendChild
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When init runs: markup, setAttribute on an attached entity, appendChild',
  summary:
    'A probe component\'s init fires once for markup, again when setAttribute adds it to an attached entity, and only on appendChild when it was set on a detached entity. The board logs each init.',
  section: 'Core API',
  tags: ['init', 'setAttribute', 'appendChild', 'createElement'],
  docs: ['repo/docs/core/component.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
