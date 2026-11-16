// aframe example: destroy(): clean up a detached entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'destroy(): clean up a detached entity',
  summary:
    'destroy() clears a detached entity\'s components and their data, but on an entity still in the scene it only warns and does nothing. The example tries both and re-creates the box after.',
  section: 'Core API',
  tags: ['destroy', 'removeChild', 'components'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
