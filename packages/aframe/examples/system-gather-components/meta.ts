// aframe example: System pattern: components register with their system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'System pattern: components register with their system',
  summary:
    'Each bobber component calls registerMe(el) in init and unregisterMe(el) in remove, so the system\'s tick can move every registered sphere in one loop. Toggle the component on a sphere and it stops bobbing and leaves the list.',
  section: 'Core API',
  tags: ['registerSystem', 'registerMe', 'unregisterMe', 'tick', 'system.entities'],
  docs: ['repo/docs/core/systems.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
