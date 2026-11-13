// Three.js example: dispose() and the renderer.info memory counters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Disposing objects',
  summary:
    'Batches of meshes with their own geometry, material and optional texture are added and removed. A live renderer.info.memory readout shows that only dispose() releases them.',
  section: 'Next Steps',
  tags: ['dispose', 'renderer.info', 'memory', 'BufferGeometry', 'Material', 'Texture'],
  docs: [
    'repo/manual/pages/how-to-dispose-of-objects.html',
    'repo/docs/pages/Info.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
