// cosmos-gl example: Repulsion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repulsion',
  summary:
    'simulationRepulsion sets how hard every point pushes the others away. A low value leaves the links pulling the graph into a clump, a high one spreads the points far apart. The slider changes it live.',
  section: 'Simulation forces',
  tags: ['simulationRepulsion', 'setConfigPartial', 'start'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
