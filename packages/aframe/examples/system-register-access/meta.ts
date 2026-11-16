// aframe example: Registering a system and reaching it as this.system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Registering a system and reaching it as this.system',
  summary:
    'A system named my-component gets its schema data from the scene attribute and runs init on scene start. The same-named component sees it as this.system; the board checks it is the instance in scene.systems and that AFRAME.systems holds the prototype.',
  section: 'Core API',
  tags: ['registerSystem', 'scene.systems', 'AFRAME.systems', 'this.system', 'schema'],
  docs: ['repo/docs/core/systems.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
