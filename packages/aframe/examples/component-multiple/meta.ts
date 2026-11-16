// aframe example: multiple: several instances with this.id and this.attrName
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'multiple: several instances with this.id and this.attrName',
  summary:
    'With multiple: true an entity carries mark__red and mark__blue. Each instance sees its own id, and uses attrName as its object3DMap key so the two spheres coexist. Removing one leaves the other.',
  section: 'Core API',
  tags: ['multiple', 'this.id', 'this.attrName', 'setObject3D', 'object3DMap'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
